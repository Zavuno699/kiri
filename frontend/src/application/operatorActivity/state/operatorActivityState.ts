import type { OperatorActivityItem } from "../activity/operatorActivityItem";

export interface OperatorActivityState {
  initialized: boolean;
  items: OperatorActivityItem[];
  loading: boolean;
  error: string | null;
}
