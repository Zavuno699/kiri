export interface RuntimeIntegrityState {
  runtimeReady: boolean;
  cacheConsistent: boolean;
  recoveryActive: boolean;
  reconciliationHealthy: boolean;
  degraded: boolean;
  reasons: string[];
}
