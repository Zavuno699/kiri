import {
  applyDomainSliceAction,
} from "../../../../application/globalState/reducers/applyDomainSliceAction";

export function updateDevicesGlobalState(
  payload: unknown,
): void {
  applyDomainSliceAction(
    "devices",
    payload,
  );
}
