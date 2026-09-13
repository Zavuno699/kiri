import {
  getGlobalState,
} from "../state/globalStateStore";

export function selectActiveDomain(): string | null {
  return (
    getGlobalState()
      .activeDomain
  );
}
