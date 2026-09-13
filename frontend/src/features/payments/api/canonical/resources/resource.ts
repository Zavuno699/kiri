export const paymentsResource = {
  key: "payments",
  basePath:
    false
      ? "/api/v1/dashboard"
      : "/api/v1/payments",
} as const;
