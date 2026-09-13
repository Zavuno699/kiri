export const locksResource = {
  key: "locks",
  basePath:
    false
      ? "/api/v1/dashboard"
      : "/api/v1/locks",
} as const;
