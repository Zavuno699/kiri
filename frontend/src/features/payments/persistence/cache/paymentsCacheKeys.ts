export const PaymentsCacheKeys = {
  collection:
    "payments:payments",

  detail(
    id: string,
  ): string {
    return "payments:" + id;
  },
};
