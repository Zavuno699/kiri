import type { ConsistencySnapshot } from "../contracts/consistencySnapshot";

export interface ConsistencyState {
  initialized: boolean;
  loading: boolean;
  snapshot: ConsistencySnapshot | null;
  error: string | null;
}
