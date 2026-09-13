export const lockQueryKeys = {
  list: ["locks", "list"] as const,
  details: (id: string) =>
    ["locks", "details", id] as const,
}
