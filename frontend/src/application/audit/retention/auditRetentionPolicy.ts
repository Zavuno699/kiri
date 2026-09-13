export interface AuditRetentionPolicy {
  maxEvents: number;
  maxAgeDays: number;
}

export const defaultAuditRetentionPolicy: AuditRetentionPolicy = {
  maxEvents: 10000,
  maxAgeDays: 90,
};
