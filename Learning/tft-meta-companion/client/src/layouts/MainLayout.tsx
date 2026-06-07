import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Meta Comps", path: "/" },
  { label: "Stats Explorer", path: "/explorer" },
  { label: "AI Coach", path: "/ai-coach" },
];

function MainLayout() {
  const { user, logoutUser } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-5 lg:grid-cols-[4fr_2fr_1fr] lg:items-center">
          {/* Title */}
          <div className="min-w-0">
            <p className="text-sm font-medium text-cyan-300">
              TFT Meta Companion
            </p>
            <h1 className="truncate text-2xl font-semibold tracking-tight">
              A focused companion for browsing TFT stats and decisions.
            </h1>
          </div>

          {/* Nav */}
          <nav
            className="flex flex-wrap items-center gap-2 lg:justify-center"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "rounded-md px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-cyan-300 text-slate-950"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2 lg:justify-end">
            {user ? (
              <>
                <span className="max-w-32 truncate rounded-md px-3 py-2 text-sm font-medium text-slate-300">
                  {user.email}
                </span>

                <button
                  type="button"
                  onClick={logoutUser}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  [
                    "rounded-md px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-cyan-300 text-slate-950"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  ].join(" ")
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
