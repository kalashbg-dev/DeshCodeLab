# 🚀 DeshCode Lab - Portfolio Profesional

Portfolio moderno y optimizado de **Kalashnikov Bello**, especialista en análisis de datos, desarrollo FullStack y soluciones de Business Intelligence.

## ✨ Características

- 🎨 **Diseño Moderno**: UI/UX elegante y responsive
- 🌙 **Tema Oscuro/Claro**: Soporte completo para ambos temas
- 🌍 **Multilingüe**: Español e Inglés
- 📱 **Mobile First**: Optimizado para todos los dispositivos
- ⚡ **Performance**: Lazy loading, code splitting y optimizaciones
- ♿ **Accesibilidad**: ARIA labels, navegación por teclado
- 🔍 **SEO Optimizado**: Metadatos, structured data, sitemap
- 📱 **PWA Ready**: Manifest, service worker, instalable
- 🎭 **Animaciones**: Framer Motion con optimizaciones
- 🎯 **TypeScript**: Código tipado y robusto

## 🛠️ Tecnologías

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animaciones fluidas
- **Radix UI** - Componentes accesibles

### Herramientas
- **ESLint** - Linting de código
- **Prettier** - Formateo automático
- **Husky** - Git hooks
- **Jest** - Testing framework

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm

### Pasos
```bash
# Clonar repositorio
git clone https://github.com/kalashdev/deshcodelab.git
cd deshcodelab

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
pnpm dev

# Construir para producción
pnpm build

# Ejecutar en producción
pnpm start
```

## 📁 Estructura del Proyecto

```
DeshCodeLab/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (Radix UI)
│   ├── sections/         # Secciones de la página
│   └── navigation/       # Componentes de navegación
├── hooks/                # Hooks personalizados
├── context/              # Contextos de React
├── lib/                  # Utilidades y configuraciones
├── public/               # Archivos estáticos
└── styles/               # Estilos y CSS
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm dev:no-turbo     # Sin Turbopack

# Construcción
pnpm build            # Construir para producción
pnpm start            # Servidor de producción

# Calidad de código
pnpm lint             # Ejecutar ESLint
pnpm lint:fix         # Corregir errores automáticamente
pnpm type-check       # Verificar tipos TypeScript

# Análisis
pnpm analyze          # Analizar bundle
pnpm format           # Formatear código
pnpm format:check     # Verificar formato

# Testing
pnpm test             # Ejecutar tests
pnpm test:watch       # Tests en modo watch

# Utilidades
pnpm clean            # Limpiar archivos generados
```
## 📱 PWA y SEO

### PWA Features
- Manifest.json configurado
- Service worker para cache offline
- Instalable en dispositivos móviles
- Splash screen personalizado

### SEO Optimizado
- Metadatos dinámicos
- Open Graph tags
- Twitter Cards
- Structured Data (JSON-LD)
- Sitemap automático
- Robots.txt configurado

## 🎨 Personalización

### Colores
Los colores se pueden personalizar en `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    // ... más variantes
  }
}
```

### Fuentes
Fuentes personalizables en `app/layout.tsx`:

```typescript
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  // ... más opciones
});
```

## 📊 Performance

### Métricas Objetivo
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **FCP**: < 1.8s

### Optimizaciones Implementadas
- Lazy loading de componentes
- Code splitting automático
- Optimización de imágenes
- Preload de recursos críticos
- Bundle analysis
- Tree shaking

## 🧪 Testing

```bash
# Ejecutar tests
pnpm test

# Tests en modo watch
pnpm test:watch

# Coverage
pnpm test:coverage
```

## 📦 Deployment

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
pnpm build

# Deploy manual o con CI/CD
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Kalashnikov Bello**
- 🐙 [GitHub](https://github.com/kalashdev)
- 💼 [LinkedIn](https://linkedin.com/in/kalashnikov-bello)
- 📧 [Email](mailto:contact@deshcodelab.com)
- 🌐 [Portfolio](https://deshcodelab.com)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework increíble
- [Tailwind CSS](https://tailwindcss.com/) - CSS utility-first
- [Radix UI](https://www.radix-ui.com/) - Componentes accesibles
- [Framer Motion](https://www.framer.com/motion/) - Animaciones fluidas
- [Vercel](https://vercel.com/) - Hosting y deployment

---

⭐ **¡Si te gusta este proyecto, dale una estrella!** ⭐
