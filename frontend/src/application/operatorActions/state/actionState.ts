import type { OperatorActionDefinition } from "../actionDefinition";

export interface OperatorActionState {
  initialized: boolean;
  actions: OperatorActionDefinition[];
  visibleActions: OperatorActionDefinition[];
}
