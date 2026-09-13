import {
  applyDomainSliceAction,
} from "../../../../application/globalState/reducers/applyDomainSliceAction";

export function updateLeasesGlobalState(
  payload: unknown,
): void {
  applyDomainSliceAction(
    "leases",
    payload,
  );
}
