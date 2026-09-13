import type { FinalRuntimeContract } from "./finalRuntimeContract";

export function isFinalRuntimeReady(
  contract: FinalRuntimeContract,
): boolean {
  return (
    contract.initialized &&
    contract.routerReady &&
    contract.securityReady &&
    contract.apiReady &&
    contract.projectionReady &&
    contract.realtimeReady
  );
}
