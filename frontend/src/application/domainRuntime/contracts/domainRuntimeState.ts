export interface DomainRuntimeState {
  domain: string;
  initialized: boolean;
  ready: boolean;
  degraded: boolean;
  lastTransitionAt: string | null;
  reason: string | null;
}
