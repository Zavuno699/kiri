export interface SecurityFreezeState {
  frozen: boolean;
  initiatedAt: string | null;
  initiatedBy: string | null;
  reason: string | null;
  credentialRevocationRequired: boolean;
  recoveryRequired: boolean;
}
