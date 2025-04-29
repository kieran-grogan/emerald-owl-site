/**
 * Emerald Owl Productions Brand Configuration
 * This file contains all brand-specific styling configurations
 */

export const brandConfig = {
  // Color Palette
  colors: {
    primary: {
      main: 'emerald-600', // Rich emerald green
      light: 'emerald-400', // Lighter emerald for accents
      dark: 'emerald-800', // Deep emerald for emphasis
      contrast: 'white'
    },
    secondary: {
      main: 'amber-500', // Owl-inspired golden amber
      light: 'amber-300', // Light golden glow
      dark: 'amber-700', // Deep amber for depth
      contrast: 'gray-900'
    },
    accent: {
      success: 'emerald-500',
      warning: 'amber-400',
      error: 'red-500',
      info: 'teal-500' // Changed to teal for better brand alignment
    },
    text: {
      primary: 'gray-900',
      secondary: 'gray-700',
      disabled: 'gray-400',
      contrast: 'white'
    },
    background: {
      light: 'white',
      dark: 'gray-900',
      paper: 'gray-50',
      elevated: 'white',
      gradient: 'bg-gradient-to-r from-emerald-600 to-amber-500'
    }
  },

  // Typography
  typography: {
    fontFamily: {
      display: 'var(--font-montserrat)', // Elegant display font
      body: 'var(--font-inter)' // Clean, readable body font
    },
    sizes: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl', // Added for hero sections
      '6xl': 'text-6xl'  // Added for impactful headlines
    },
    weights: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      black: 'font-black' // Added for extra emphasis
    }
  },

  // Spacing
  spacing: {
    xs: 'space-y-2',
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12',
    '2xl': 'space-y-16' // Added for larger sections
  },

  // Animations
  animations: {
    transition: {
      fast: 'transition-all duration-200',
      normal: 'transition-all duration-300',
      slow: 'transition-all duration-500',
      smooth: 'transition-all duration-700 ease-in-out' // Added for smoother transitions
    },
    hover: {
      scale: 'hover:scale-105',
      lift: 'hover:-translate-y-1',
      glow: 'hover:shadow-lg hover:shadow-emerald-100/50',
      shine: 'hover:bg-gradient-to-r hover:from-emerald-500 hover:to-amber-400' // Added gradient hover effect
    }
  },

  // Component Styles
  components: {
    button: {
      base: 'rounded-lg font-medium transition-all duration-200',
      variants: {
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
        secondary: 'bg-amber-500 hover:bg-amber-600 text-gray-900 shadow-sm',
        outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50',
        ghost: 'text-emerald-600 hover:bg-emerald-50',
        gradient: 'bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white'
      },
      sizes: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl' // Added for hero CTAs
      }
    },
    card: {
      base: 'rounded-xl overflow-hidden',
      variants: {
        elevated: 'bg-white shadow-lg hover:shadow-xl transition-shadow duration-300',
        outlined: 'border border-gray-200 hover:border-emerald-200 transition-colors duration-300',
        filled: 'bg-gray-50',
        gradient: 'bg-gradient-to-br from-emerald-50 to-amber-50' // Added gradient card
      }
    },
    input: {
      base: 'rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200',
      variants: {
        filled: 'bg-gray-50 border-transparent',
        outlined: 'bg-transparent',
        standard: 'border-b border-t-0 border-x-0 rounded-none',
        floating: 'bg-transparent border-b-2 focus:border-emerald-500' // Added floating label style
      }
    }
  },

  // Effects
  effects: {
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      glow: 'shadow-lg shadow-emerald-100/50',
      ambient: 'shadow-xl shadow-emerald-900/10' // Added subtle ambient shadow
    },
    gradient: {
      primary: 'bg-gradient-to-r from-emerald-500 to-emerald-700',
      secondary: 'bg-gradient-to-r from-amber-400 to-amber-600',
      brand: 'bg-gradient-to-r from-emerald-600 to-amber-500', // Added brand gradient
      subtle: 'bg-gradient-to-r from-gray-50 to-white'
    }
  },

  // Dark Mode Variants
  darkMode: {
    background: {
      primary: 'dark:bg-gray-900',
      secondary: 'dark:bg-gray-800',
      elevated: 'dark:bg-gray-700',
      gradient: 'dark:bg-gradient-to-r dark:from-emerald-900 dark:to-amber-900'
    },
    text: {
      primary: 'dark:text-white',
      secondary: 'dark:text-gray-300',
      muted: 'dark:text-gray-400'
    },
    border: {
      primary: 'dark:border-gray-700',
      secondary: 'dark:border-gray-600',
      accent: 'dark:border-emerald-700'
    }
  }
}; 