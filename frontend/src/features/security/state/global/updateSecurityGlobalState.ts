import {
  applyDomainSliceAction,
} from "../../../../application/globalState/reducers/applyDomainSliceAction";

export function updateSecurityGlobalState(
  payload: unknown,
): void {
  applyDomainSliceAction(
    "security",
    payload,
  );
}
