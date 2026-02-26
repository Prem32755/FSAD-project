import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
  border: 'rgba(210, 220, 230, 0.3)',
  background: '#ffffff',
  foreground: '#1e293b',
  primary: '#0c4a6e', // Deep professional blue
  secondary: '#059669', // Trust-focused green
  accent: '#d97706', // Luxury gold
},

    },
  },
  
  plugins: [],
} satisfies Config
