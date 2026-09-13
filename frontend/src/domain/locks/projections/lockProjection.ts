export type LockProjection = {
  id: string;
  deviceId?: string;
  propertyId?: string;
  state: "locked" | "unlocked" | "frozen" | "unknown";
  credentialVersion: number;
  version: number;
  updatedAt: string;
};
