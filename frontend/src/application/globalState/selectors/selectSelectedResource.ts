import {
  getGlobalState,
} from "../state/globalStateStore";

export function selectSelectedResource(): string | null {
  return (
    getGlobalState()
      .selectedResourceId
  );
}
