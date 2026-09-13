import { NavLink, Outlet, useLocation } from "react-router"

const navigation = [
  {
    to: "/",
    label: "Overview",
    short: "OV",
    end: true,
  },
  {
    to: "/properties",
    label: "Properties",
    short: "PR",
  },
  {
    to: "/leases",
    label: "Leases",
    short: "LE",
  },
  {
    to: "/payments",
    label: "Payments",
    short: "PY",
  },
  {
    to: "/devices",
    label: "Devices",
    short: "DV",
  },
  {
    to: "/locks",
    label: "Locks",
    short: "LK",
  },
  {
    to: "/security",
    label: "Security",
    short: "SC",
  },
  {
    to: "/health",
    label: "Health",
    short: "HP",
  },
]

function pageTitle(pathname: string) {
  if (pathname === "/") return "Operational overview"

  const item = navigation.find(
    (entry) => entry.to !== "/" && pathname.startsWith(entry.to),
  )

  return item?.label ?? "KiriLock"
}

export function AppShell() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-kiri-950 text-kiri-text">
      <div className="flex min-h-screen">
        <aside className="hidden w-[272px] shrink-0 border-r border-white/8 bg-kiri-925 lg:block">
          <div className="sticky top-0 flex h-screen flex-col px-4 py-5">
            <div className="mb-7 px-3">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-kiri-blue-600 text-lg font-black shadow-[0_0_30px_rgba(47,107,255,0.28)]">
                  K
                </div>

                <div>
                  <div className="text-[17px] font-bold tracking-tight">
                    KiriLock
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-kiri-text-muted">
                    Property control
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-kiri-text-muted">
              Command center
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm",
                      "transition duration-150",
                      isActive
                        ? "kiri-nav-active border-kiri-blue-500/25"
                        : "border-transparent text-kiri-text-soft hover:border-white/8 hover:bg-white/[0.025] hover:text-kiri-text",
                    ].join(" ")
                  }
                >
                  <span className="grid size-7 place-items-center rounded-lg border border-white/8 bg-white/[0.025] text-[9px] font-bold tracking-wider text-kiri-text-muted group-hover:text-kiri-blue-400">
                    {item.short}
                  </span>

                  <span className="flex-1">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto rounded-2xl border border-kiri-green/15 bg-kiri-green/[0.04] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="size-2 rounded-full bg-kiri-green shadow-[0_0_12px_rgba(37,201,149,0.8)]" />
                <span className="text-xs font-semibold text-kiri-text-soft">
                  Runtime
                </span>
              </div>

              <div className="text-sm font-semibold">
                Control plane
              </div>

              <p className="mt-1 text-xs leading-5 text-kiri-text-muted">
                Unified KiriLock operator workspace.
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-white/8 bg-kiri-950/85 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8">
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-kiri-blue-400">
                  KiriLock / {pageTitle(location.pathname)}
                </div>
                <h1 className="text-xl font-bold tracking-tight text-kiri-text sm:text-2xl">
                  {pageTitle(location.pathname)}
                </h1>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.025] px-3 py-2 text-xs text-kiri-text-muted">
                  <span className="size-2 rounded-full bg-kiri-green shadow-[0_0_10px_rgba(37,201,149,0.75)]" />
                  System ready
                </div>

                <div className="grid size-10 place-items-center rounded-xl border border-white/8 bg-kiri-900 text-xs font-bold text-kiri-text-soft">
                  KL
                </div>
              </div>
            </div>
          </header>

          <div className="kiri-grid min-h-[calc(100vh-89px)] px-5 py-6 sm:px-8 sm:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
