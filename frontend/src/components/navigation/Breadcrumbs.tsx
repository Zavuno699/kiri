import { Link } from "react-router"

export interface BreadcrumbItem {
  label: string
  path?: string
}

export function Breadcrumbs({
  items,
}: {
  items: BreadcrumbItem[]
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-[10px] text-kiri-text-muted"
    >
      {items.map((item, index) => (
        <span
          key={`${item.label}-${index}`}
          className="flex items-center gap-2"
        >
          {index > 0 ? <span>/</span> : null}

          {item.path ? (
            <Link
              to={item.path}
              className="transition hover:text-kiri-text-soft"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-kiri-text-soft">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
