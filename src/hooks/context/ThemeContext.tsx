import { createContext, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = { theme: Theme; toggleTheme: () => void }

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const ThemeProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = useState<Theme>('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
