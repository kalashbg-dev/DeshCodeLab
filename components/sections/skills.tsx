"use client"
import { motion } from "framer-motion"
import { Code, Database, BarChart3, Brain, GitBranchPlus } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const skills = [
  {
    category: "Frontend",
    icon: Code,
    skills: [
      { name: "React/Next.js", level: 85 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 70 },
      { name: "CSS", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: Database,
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Python", level: 92 },
      { name: "SQL", level: 85 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    category: "Data Analysis",
    icon: BarChart3,
    skills: [
      { name: "Power BI", level: 70 },
      { name: "Excel", level: 80 },
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 90 },
      { name: "Seaborn", level: 88 },
    ],
  },
  {
    category: "AI/ML",
    icon: Brain,
    skills: [
      { name: "Machine Learning", level: 80 },
      { name: "Keras", level: 75 },
      { name: "TensorFlow", level: 60 },
      { name: "Scikit-learn", level: 85 },
      { name: "OpenAI API", level: 90 },
    ],
  },
  {
    category: "Others",
    icon: GitBranchPlus,
    skills: [
      { name: "Git/Github", level: 85 },
      { name: "Trello/Slack/Asana", level: 90 },
      { name: "Figma", level: 75 },
      { name: "Photoshop/Illustrator", level: 70 },
      { name: "Docker", level: 75 },
    ],
  },
]

export default function Skills() {
  const { language } = useLanguage()
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      ref={ref} id="skills"
      className="py-20 bg-gradient-to-br from-background via-muted/50 to-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {language === "es" ? "Habilidades Técnicas" : "Technical Skills"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "es"
              ? "Dominio de tecnologías modernas para crear soluciones innovadoras"
              : "Mastery of modern technologies to create innovative solutions"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
