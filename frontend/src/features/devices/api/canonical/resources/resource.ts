export const devicesResource = {
  key: "devices",
  basePath:
    false
      ? "/api/v1/dashboard"
      : "/api/v1/devices",
} as const;
