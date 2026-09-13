import {
  applyDomainSliceAction,
} from "../../../../application/globalState/reducers/applyDomainSliceAction";

export function updatePaymentsGlobalState(
  payload: unknown,
): void {
  applyDomainSliceAction(
    "payments",
    payload,
  );
}
