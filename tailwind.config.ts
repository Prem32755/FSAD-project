import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
  border: 'rgba(0,0,0,0.1)', // soft border color
  background: '#f9fafb',
  foreground: '#111827',
  primary: '#3b82f6', // calm blue
  secondary: '#10b981', // soft green
  accent: '#f59e0b', // orange accent
},

    },
  },
  
  plugins: [],
} satisfies Config
