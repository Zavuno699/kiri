export const VERIFIED_DEVICE_ENDPOINTS = {
  register:
    "/api/v1/register",

  status:
    "/api/v1/status",

  command:
    "/api/v1/command",

  collection:
    "/api/v1/devices/",

  detail:
    (id: string) =>
      `/api/v1/devices/${id}`,
} as const;
