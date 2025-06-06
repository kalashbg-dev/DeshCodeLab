<div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>;
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Agrodash RD",
    description: {
      en: "Platform for Dominican Interday Market Analysis with Advanced Statistical KPIs, Insights with filters and Prediction Models",
      es: "Plataforma para análisis del mercado interdiario dominicano con KPIs estadísticos avanzados, insights con filtros y modelos de predicción",
    },
    image: "/Agrodash-main.png",
    technologies: ["Python", "Streamlit", "Prophet", "CSS"],
    category: "data",
    links: {
      demo: "#", //dockerizar y desplegar en render
      // demo: "https://agrodashrd.onrender.com",
      github: `${process.env.NEXT_PUBLIC_GITHUB}/AgroDashRD/`,
    },
  },

  {
    id: 2,
    title: "Currency Converter",
    description: {
      en: "A tool for managing exchange rates, tracking conversions, and analyzing historical data.",
      es: "Una herramienta para gestionar tasas de cambio, rastrear conversiones y analizar datos históricos.",
    },
    image: "converter.png",
    technologies: [
      "Typescript",
      "Tailwind CSS",
      "MongoDB",
      "Node.js",
      "React.js",
    ],
    category: "web",
    links: {
      demo: `${process.env.NEXT_PUBLIC_CURRENCY_CONVERTER_DEMO}`,
      github: `${process.env.NEXT_PUBLIC_GITHUB}/conversor-de-moneda/`,
    },
  },
  {
    id: 3,
    title: "Hojutsu Bot",
    description: {
      en: "Telegram Group Management Bot Template",
      es: "Modelo para Bot de gestión de grupos de Telegram.",
    },
    image: "/hojutsu_bot.jpg",
    technologies: ["Python", "Docker", "PostgreSQL", "FastAPI"],
    category: "tools",
    links: {
      demo: "#",
      github: `${process.env.NEXT_PUBLIC_GITHUB}/Hojutsu_Bot/`,
    },
  },
  {
    id: 4,
    title: "MintDev- For Linux Mint",
    description: {
      en: "An automated tool to quickly set up a professional development environment",
      es: "Una herramienta automatizada para configurar rápidamente un entorno de desarrollo profesional",
    },
    image: "mintdev.png",
    technologies: ["Shell"],
    category: "tools",
    links: {
      demo: "#",
      github: `${process.env.NEXT_PUBLIC_GITHUB}/mintdev/`,
    },
  },
  {
    id: 5,
    title: "ChatBot DEMO",
    description: {
      en: "Customizable and trainable Chatbot model for entrepreneurs and websites",
      es: "Modelo de Chatbot personalizable y entrenable para emprendedores y páginas web",
    },
    image: "ChatBotDEMo.png",
    technologies: ["JavaScript", "CSS", "HTML"],
    category: "ai",
    links: {
      demo: "#",
      github: `${process.env.NEXT_PUBLIC_GITHUB}/ChatbotM-demo/`,
    },
  },

  {
    id: 6,
    title: "CoinLarimar",
    description: {
      en: "Crypto analysis WebApp with dashboard, news, portfolio, trading journal, position calculator, whale tracker, and personal AI.",
      es: "WebApp de análisis de criptomonedas con dashboard, noticias, portafolio, diario de trading, calculadora de posiciones, rastreador de ballenas e IA personal.",
    },
    image: {
      en: "CoinLarimarEN.png",
      es: "CoinLarimarES.png",
    },
    technologies: ["Flutter", "Firebase", "Make", "Vertex AI"],
    category: "web",
    links: {
      demo: "#",
      github: "#",
    },
  },

  {
    id: 7,
    title: "SillageWorld",
    description: {
      en: "A fragrance dropshipping e-commerce platform",
      es: "Una plataforma de e-commerce de dropshipping de fragancias",
    },
    image: {
      en: "SillageWorld.png",
      es: "MundoSillage.png",
    },
    technologies: ["Vue.js", "Node.js", "MongoDB", "Stripe"],
    category: "web",
    links: {
      demo: "#",
      github: "#",
    },
  },
];
const categories = [
  { id: "all", label: { en: "All", es: "Todos" } },
  { id: "web", label: { en: "Web Apps", es: "Apps Web" } },
  { id: "data", label: { en: "Data Analysis", es: "Análisis de Datos" } },
  { id: "ai", label: { en: "AI/ML", es: "IA/ML" } },
  { id: "tools", label: { en: "Tools/DevOps", es: "Herramientas/DevOps" } },
];

export default function Portfolio() {
  const { language } = useLanguage();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      ref={ref}
      id="portfolio"
      className="py-20 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {language === "es" ? "Mi Portafolio" : "My Portfolio"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === "es"
              ? "Una selección de proyectos que demuestran mi experiencia en desarrollo y análisis de datos"
              : "A selection of projects that showcase my expertise in development and data analysis"}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full px-6 py-2 transition-all duration-300"
            >
              <Filter className="h-4 w-4 mr-2" />
              {language === "es" ? category.label.es : category.label.en}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              layout
            >
              <GlassCard className="overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      typeof project.image === "string"
                        ? project.image
                        : (project.image as { [key: string]: string })?.[
                            language
                          ] || "/placeholder.svg"
                    }
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.links.demo !== "#" && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        aria-label="View Demo"
                      >
                        <ExternalLink className="h-4 w-4 text-white" />
                      </a>
                    )}
                    {project.links.github !== "#" && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        aria-label="View Code"
                      >
                        <Github className="h-4 w-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {language === "es"
                      ? project.description.es
                      : project.description.en}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-8">
            {language === "es"
              ? "¿Interesado en trabajar juntos? Hablemos sobre tu próximo proyecto."
              : "Interested in working together? Let's discuss your next project."}
          </p>
          <Button
            size="lg"
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
          >
            {language === "es" ? "Iniciar Conversación" : "Start Conversation"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
