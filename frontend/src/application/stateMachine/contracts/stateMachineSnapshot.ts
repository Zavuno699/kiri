export interface StateMachineSnapshot {
  entityId: string;
  domain: string;
  currentState: string;
  availableTransitionIds: string[];
  guardIds: string[];
  invariantIds: string[];
  version: number;
  healthy: boolean;
}
