import type { RuntimeHealthSnapshot } from "./runtimeHealthSnapshot"

export function createRuntimeHealthSnapshot(
  values: Omit<RuntimeHealthSnapshot, "checkedAt">,
): RuntimeHealthSnapshot {
  return {
    ...values,
    checkedAt: new Date().toISOString(),
  }
}
