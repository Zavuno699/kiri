import {
  applyDomainSliceAction,
} from "../../../../application/globalState/reducers/applyDomainSliceAction";

export function updateLocksGlobalState(
  payload: unknown,
): void {
  applyDomainSliceAction(
    "locks",
    payload,
  );
}
