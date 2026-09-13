export const propertyQueryKeys = {
  list: ["properties", "list"] as const,
  details: (id: string) =>
    ["properties", "details", id] as const,
}
