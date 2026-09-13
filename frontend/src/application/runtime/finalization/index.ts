export type RuntimeFinalizationState = {
  initialized: boolean;
  completedAt?: string;
};

export const runtimeFinalizationState: RuntimeFinalizationState = {
  initialized: false,
};

export function markRuntimeFinalized(): void {
  runtimeFinalizationState.initialized = true;
  runtimeFinalizationState.completedAt =
    new Date().toISOString();
}
