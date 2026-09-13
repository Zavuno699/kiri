export const deviceVerifiedPaths = {
  register: "/api/v1/register",
  status: "/api/v1/status",
  command: "/api/v1/command",
  detail: (id: string) =>
    `/api/v1/devices/${id}`,
}
