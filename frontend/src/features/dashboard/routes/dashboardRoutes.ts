export const dashboardRoutes = [
  {
    id: "dashboard-overview",
    key: "dashboard",
    path: "/",
    page: "overview",
    enabled: true,
  },
  {
    id: "dashboard-workspace",
    key: "dashboard-workspace",
    path: "/dashboard/workspace",
    page: "workspace",
    enabled: true,
  },
] as const
