export const paymentQueryKeys = {
  list: ["payments", "list"] as const,
  details: (id: string) =>
    ["payments", "details", id] as const,
}
