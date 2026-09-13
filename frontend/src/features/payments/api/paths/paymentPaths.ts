export const paymentPaths = {
  list: "/api/v1/payments",
  detail: (id: string) =>
    "/api/v1/payments/" + id,
}
