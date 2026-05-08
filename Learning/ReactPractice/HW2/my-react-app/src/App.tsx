import { useState, type ReactNode } from 'react'
import Dashboard from './pages/Dashboard'
import Timers from './pages/Timers'
import Todos from './pages/Todos'
import MultiStepForm from './pages/MultiStepForm'
import './index.css'

type PageKey = 'dashboard' | 'timers' | 'todos' | 'form'

const pages: Record<PageKey, { label: string; component: ReactNode }> = {
  dashboard: { label: 'Dashboard', component: <Dashboard /> },
  timers: { label: 'Timers', component: <Timers /> },
  todos: { label: 'Todos', component: <Todos /> },
  form: { label: 'Checkout', component: <MultiStepForm /> },
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('dashboard')

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">React Practice App</p>
          <h1>Productivity Dashboard (Skeleton)</h1>
        </div>

        <nav className="nav-bar">
          {Object.entries(pages).map(([key, page]) => (
            <button
              key={key}
              type="button"
              className={currentPage === key ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentPage(key as PageKey)}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </header>

      <main>{pages[currentPage].component}</main>
    </div>
  )
}

export default App
