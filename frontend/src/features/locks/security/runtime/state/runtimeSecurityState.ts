export interface LocksRuntimeSecurityState {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  restricted: boolean;
  reason: string | null;
}
