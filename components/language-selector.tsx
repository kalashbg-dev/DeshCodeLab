"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
      className="bg-background/80 backdrop-blur-sm"
    >
      {language === "en" ? "ES" : "EN"}
    </Button>
  )
}
