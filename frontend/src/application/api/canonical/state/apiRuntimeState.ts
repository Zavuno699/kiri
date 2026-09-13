export interface ApiRuntimeState {
  initialized: boolean;
  resourceCount: number;
  operationCount: number;
  lastInitializedAt: string | null;
}
