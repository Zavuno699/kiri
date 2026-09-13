export const deviceQueryKeys = {
  list: ["devices", "list"] as const,
  details: (id: string) =>
    ["devices", "details", id] as const,
}
