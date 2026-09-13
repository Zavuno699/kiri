export type DeviceProjection = {
  id: string;
  propertyId?: string;
  status: "online" | "offline" | "degraded" | "unknown";
  firmware?: string;
  lastSeenAt?: string;
  version: number;
  updatedAt: string;
};
