import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Meta Comps', path: '/' },
  { label: 'Stats Explorer', path: '/explorer' },
  { label: 'AI Coach', path: '/ai-coach' },
]

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-300">TFT Meta Companion</p>
            <h1 className="text-2xl font-semibold tracking-tight">Learn the meta one decision at a time</h1>
          </div>

          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-cyan-300 text-slate-950'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
