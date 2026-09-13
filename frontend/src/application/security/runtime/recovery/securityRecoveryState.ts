export interface SecurityRecoveryState {
  recovering: boolean;
  recovered: boolean;
  lastRecoveryAt: string | null;
  reason: string | null;
}
