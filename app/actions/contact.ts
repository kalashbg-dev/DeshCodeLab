'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

type FormState = {
  success?: boolean
  message: string
  errors?: Array<{
    path: string
    message: string
  }>
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    // Convert FormData to object
    const rawFormData = Object.fromEntries(formData.entries())
    
    // Validate form data
    const validatedData = contactFormSchema.parse(rawFormData)
    
    // Ensure required environment variables are set
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }
    
    if (!process.env.CONTACT_EMAIL) {
      throw new Error('CONTACT_EMAIL is not configured')
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL,
      replyTo: validatedData.email,
      subject: `New Contact: ${validatedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      return { 
        success: false, 
        message: 'Failed to send message. Please try again.' 
      }
    }

    return { 
      success: true, 
      message: 'Message sent successfully!' 
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }))
      }
    }
    
    return { 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    }
  }
}
