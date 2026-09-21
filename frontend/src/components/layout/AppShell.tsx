import { NavLink, Outlet, useLocation, useNavigate } from "react-router"
import { getAuthenticationState } from "../../application/authentication/state/authenticationStore"
import { logout } from "../../application/authentication/commands/logout"

interface NavItem {
  to: string
  label: string
  short: string
  end?: boolean
  requiredRoles?: string[]
}

const allNavigation: NavItem[] = [
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
    requiredRoles: ["landlord", "operator", "security_admin", "super_admin"],
  },
  {
    to: "/tenants",
    label: "Tenants",
    short: "TN",
    requiredRoles: ["landlord", "super_admin"],
  },
  {
    to: "/leases",
    label: "Leases",
    short: "LE",
    requiredRoles: ["landlord", "tenant", "operator", "security_admin", "super_admin"],
  },
  {
    to: "/payments",
    label: "Payments",
    short: "PY",
    requiredRoles: ["landlord", "tenant", "operator", "security_admin", "super_admin"],
  },
  {
    to: "/devices",
    label: "Devices",
    short: "DV",
    requiredRoles: ["landlord", "operator", "security_admin", "super_admin"],
  },
  {
    to: "/locks",
    label: "Locks",
    short: "LK",
    requiredRoles: ["landlord", "tenant", "operator", "security_admin", "super_admin"],
  },
  {
    to: "/security",
    label: "Security",
    short: "SC",
    requiredRoles: ["security_admin", "super_admin"],
  },
  {
    to: "/rbac",
    label: "RBAC",
    short: "RB",
    requiredRoles: ["security_admin", "super_admin"],
  },
  {
    to: "/operator-control",
    label: "Operations",
    short: "OP",
    requiredRoles: ["operator", "security_admin", "super_admin"],
  },
  {
    to: "/health",
    label: "Health",
    short: "HP",
  },
]

const landlordNavigation: NavItem[] = [
  {
    to: "/landlord",
    label: "Dashboard",
    short: "DB",
    end: true,
  },
  {
    to: "/landlord/properties",
    label: "Properties",
    short: "PR",
  },
  {
    to: "/landlord/tenants",
    label: "Tenants",
    short: "TN",
  },
  {
    to: "/landlord/leases",
    label: "Leases",
    short: "LE",
  },
  {
    to: "/landlord/payments",
    label: "Payments",
    short: "PY",
  },
  {
    to: "/landlord/devices",
    label: "Devices",
    short: "DV",
  },
  {
    to: "/landlord/locks",
    label: "Locks",
    short: "LK",
  },
]

function getNavigationForRoles(userRoles: string[] = []): NavItem[] {
  return allNavigation.filter(item => {
    if (!item.requiredRoles || item.requiredRoles.length === 0) return true
    return item.requiredRoles.some(role => userRoles.includes(role))
  })
}

function pageTitle(pathname: string) {
  if (pathname === "/") return "Operational overview"

  const item = allNavigation.find(
    (entry) => entry.to !== "/" && pathname.startsWith(entry.to),
  )

  return item?.label ?? "KiriLock"
}

function getRoleBadge(isAdmin: boolean, isSuperAdmin: boolean, roles: string[] = []) {
  if (isSuperAdmin) return { label: "Super Admin", color: "bg-purple-500" }
  if (isAdmin) return { label: "Admin", color: "bg-blue-500" }
  if (roles.includes("landlord")) return { label: "Landlord", color: "bg-green-500" }
  if (roles.includes("tenant")) return { label: "Tenant", color: "bg-orange-500" }
  if (roles.includes("operator")) return { label: "Operator", color: "bg-cyan-500" }
  return { label: "User", color: "bg-gray-500" }
}

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const authState = getAuthenticationState()
  
  // Use landlord-specific navigation when user is a landlord
  const isLandlord = authState.roles?.includes("landlord")
  const navigation = isLandlord 
    ? landlordNavigation 
    : getNavigationForRoles(authState.roles)
  const roleBadge = getRoleBadge(!!authState.isAdmin, !!authState.isSuperAdmin, authState.roles)

  const handleSignOut = async () => {
    await logout()
    navigate("/signin")
  }

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

                <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${roleBadge.color}`} />
                    <span className="text-xs font-medium text-kiri-text-soft">
                      {roleBadge.label}
                    </span>
                  </div>
                  <div className="h-4 w-px bg-white/8" />
                  <span className="text-xs text-kiri-text-muted">
                    {authState.principal || "User"}
                  </span>
                </div>

                <button
                  onClick={handleSignOut}
                  className="rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2 text-xs font-medium text-kiri-text-soft transition hover:bg-white/[0.05] hover:text-kiri-text"
                >
                  Sign out
                </button>
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
