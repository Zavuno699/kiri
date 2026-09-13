export const leaseQueryKeys = {
  list: ["leases", "list"] as const,
  details: (id: string) =>
    ["leases", "details", id] as const,
}
