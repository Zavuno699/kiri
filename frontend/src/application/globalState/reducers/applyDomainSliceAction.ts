import {
  setStateSlice,
} from "./stateSliceReducer";

export function applyDomainSliceAction(
  domain: string,
  payload: unknown,
): void {
  setStateSlice(
    domain,
    payload,
  );
}
