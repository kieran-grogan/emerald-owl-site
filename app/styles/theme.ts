export const theme = {
  brand: {
    name: 'Emerald Owl Productions',
    description: 'Professional Event Production Services',
    colors: {
      primary: {
        main: '#16a34a', // Rich emerald green
        light: '#4ade80', // Light emerald
        dark: '#166534', // Deep emerald
        accent: '#10b981', // Vibrant emerald
      },
      secondary: {
        main: '#f59e0b', // Warm amber (owl eyes)
        light: '#fcd34d', // Light amber glow
        dark: '#b45309', // Deep amber
        accent: '#d97706', // Vibrant amber
      },
      neutral: {
        white: '#ffffff',
        black: '#0a0a0a',
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        background: {
          primary: '#0f172a', // Dark slate
          secondary: '#1e293b', // Lighter slate
          accent: '#16a34a', // Emerald for accents
          surface: '#334155', // Card/element backgrounds
          overlay: 'rgba(15, 23, 42, 0.8)', // Modal/overlay background
        }
      }
    },
    gradients: {
      primary: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
      secondary: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      accent: 'linear-gradient(135deg, #16a34a 0%, #f59e0b 100%)',
      dark: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      glow: 'radial-gradient(circle at center, rgba(22, 163, 74, 0.15) 0%, rgba(15, 23, 42, 0) 70%)'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
      highlight: '0 0 15px rgba(22, 163, 74, 0.3)',
      glow: '0 0 30px rgba(22, 163, 74, 0.2)'
    },
    typography: {
      fonts: {
        display: 'Montserrat, sans-serif',
        body: 'Inter, sans-serif',
      },
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900,
      }
    },
    spacing: {
      container: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      section: {
        sm: '2rem',
        md: '4rem',
        lg: '6rem',
        xl: '8rem',
      }
    },
    borderRadius: {
      sm: '0.25rem',
      DEFAULT: '0.375rem',
      md: '0.5rem',
      lg: '1rem',
      xl: '1.5rem',
      full: '9999px',
    },
    effects: {
      glow: {
        sm: 'drop-shadow(0 0 10px rgba(22, 163, 74, 0.2))',
        md: 'drop-shadow(0 0 20px rgba(22, 163, 74, 0.3))',
        lg: 'drop-shadow(0 0 30px rgba(22, 163, 74, 0.4))'
      },
      backdrop: {
        blur: 'backdrop-filter: blur(8px)',
        dark: 'background: rgba(15, 23, 42, 0.8)',
        light: 'background: rgba(255, 255, 255, 0.1)'
      }
    }
  }
}; 