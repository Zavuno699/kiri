import {
  reconcileProjection,
  type ProjectionReconciliationInput,
  type ProjectionReconciliationResult,
} from "./projectionReconciliation";

export function reconcileProjectionSet(
  inputs: ProjectionReconciliationInput[],
): ProjectionReconciliationResult[] {
  return inputs.map(reconcileProjection);
}
