export type SecurityProjection = {
  scopeId: string;
  incidentCount: number;
  credentialRevocations: number;
  emergencyFreezeActive: boolean;
  integrityStatus: "healthy" | "warning" | "critical";
  version: number;
  updatedAt: string;
};
