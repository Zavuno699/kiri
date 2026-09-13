import {
  NavLink,
  useLocation,
} from "react-router"

import {
  navigationItems,
} from "./navigation"

export function OperatorNavigation() {
  const location = useLocation()

  return (
    <nav className="space-y-6" aria-label="Primary navigation">
      {["Overview", "Property operations", "Financial operations", "Cyber-physical operations", "Security operations"].map(
        (section) => {
          const items = navigationItems.filter(
            (item) => item.section === section,
          )

          if (items.length === 0) return null

          return (
            <div key={section}>
              <div className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-kiri-text-muted">
                {section}
              </div>

              <div className="space-y-1">
                {items.map((item) => {
                  const exact =
                    item.path === "/"
                      ? location.pathname === "/"
                      : location.pathname === item.path ||
                        location.pathname.startsWith(
                          `${item.path}/`,
                        )

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/"}
                      className={[
                        "group block rounded-xl border px-3 py-3 transition",
                        exact
                          ? "border-kiri-blue-500/20 bg-kiri-blue-500/[0.07]"
                          : "border-transparent hover:border-white/6 hover:bg-white/[0.025]",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={[
                            "text-xs font-semibold",
                            exact
                              ? "text-kiri-text"
                              : "text-kiri-text-soft",
                          ].join(" ")}
                        >
                          {item.label}
                        </span>

                        <span
                          className={[
                            "h-1.5 w-1.5 rounded-full transition",
                            exact
                              ? "bg-kiri-blue-400 shadow-[0_0_12px_rgba(75,141,255,.6)]"
                              : "bg-kiri-text-muted/40 group-hover:bg-kiri-text-muted",
                          ].join(" ")}
                        />
                      </div>

                      <div
                        className={[
                          "mt-1 text-[10px] leading-4",
                          exact
                            ? "text-kiri-text-muted"
                            : "text-kiri-text-muted/80",
                        ].join(" ")}
                      >
                        {item.description}
                      </div>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          )
        },
      )}
    </nav>
  )
}
