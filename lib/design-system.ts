// Unified Design System Configuration
export const designSystem = {
  // Color Palette
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    gradients: {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      cyan: 'from-cyan-500 to-blue-500',
      teal: 'from-teal-500 to-cyan-500',
      indigo: 'from-indigo-500 to-blue-500',
      pink: 'from-pink-500 to-rose-500',
      orange: 'from-orange-500 to-red-500'
    }
  },

  // Typography
  typography: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
    h4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
    body: 'text-base md:text-lg leading-relaxed',
    small: 'text-sm md:text-base'
  },

  // Spacing
  spacing: {
    section: 'py-20 px-6',
    container: 'max-w-7xl mx-auto',
    gridGap: 'gap-8',
    cardPadding: 'p-8'
  },

  // Effects
  effects: {
    backdrop: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg',
    border: 'border border-white/20 dark:border-slate-700/50',
    shadow: 'shadow-xl hover:shadow-2xl',
    rounded: 'rounded-2xl',
    transition: 'transition-all duration-300'
  },

  // Animations
  animations: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 }
    },
    slideIn: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6 }
    }
  },

  // Components
  components: {
    card: `
      bg-white/80 dark:bg-slate-800/80 
      backdrop-blur-lg 
      rounded-2xl 
      p-8 
      shadow-xl 
      hover:shadow-2xl 
      transition-all 
      duration-300 
      border 
      border-white/20 
      dark:border-slate-700/50
    `,
    button: `
      px-6 
      py-3 
      rounded-xl 
      font-semibold 
      transition-all 
      duration-300 
      hover:scale-105 
      focus:outline-none 
      focus:ring-2 
      focus:ring-offset-2
    `,
    section: `
      py-20 
      px-6 
      bg-gradient-to-br 
      from-blue-50/50 
      to-purple-50/50 
      dark:from-slate-900/30 
      dark:to-slate-800/30 
      backdrop-blur-md
    `
  }
};

// Utility functions
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

// Gradient color mapping for different categories
export const categoryColors = {
  languages: 'from-blue-500 to-cyan-500',
  devops: 'from-orange-500 to-red-500',
  databases: 'from-green-500 to-emerald-500',
  frameworks: 'from-violet-500 to-purple-500',
  tools: 'from-yellow-500 to-orange-500',
  cloud: 'from-indigo-500 to-blue-500'
};

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};