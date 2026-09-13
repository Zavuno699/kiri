export interface PageDataRoute {
  id: string
  key: string
  path: string
  domain: string
  page: "overview" | "list" | "workspace" | "detail" | string
  enabled: boolean
}

export const pageDataRoutes: PageDataRoute[] = [
  {
    id: "dashboard-overview",
    key: "dashboard",
    path: "/",
    domain: "dashboard",
    page: "overview",
    enabled: true,
  },
]
