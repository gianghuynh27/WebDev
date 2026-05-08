import { useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"


export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light'|'dark'>('theme','light')
  const toggleTheme = () =>{
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  useEffect(()=>{
    document.documentElement.dataset.theme = theme
  }, [theme])
  return (
    <div className="panel">
      <h2>Theme Toggle</h2>
      <button type="button" className="button" onClick={()=>toggleTheme()}>
        {theme === "light" ? "Dark" : "Light"} mode
      </button>
    </div>
  );
}
