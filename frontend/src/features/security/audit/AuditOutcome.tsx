
export interface AuditOutcome {
  success: number;
  denied: number;
  failed: number;
  unknown: number;
}

export function emptyAuditOutcome(): AuditOutcome {
  return {
    success: 0,
    denied: 0,
    failed: 0,
    unknown: 0,
  };
}

