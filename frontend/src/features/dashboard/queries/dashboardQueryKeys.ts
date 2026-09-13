export const dashboardQueryKeys = {
  list: ["dashboard", "list"] as const,
  details: (id: string) =>
    ["dashboard", "details", id] as const,
}
