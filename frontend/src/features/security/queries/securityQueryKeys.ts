export const securityQueryKeys = {
  list: ["security", "list"] as const,
  details: (id: string) =>
    ["security", "details", id] as const,
}
