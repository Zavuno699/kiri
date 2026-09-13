import {
  applyDomainSliceAction,
} from "../../../../application/globalState/reducers/applyDomainSliceAction";

export function updateDashboardGlobalState(
  payload: unknown,
): void {
  applyDomainSliceAction(
    "dashboard",
    payload,
  );
}
