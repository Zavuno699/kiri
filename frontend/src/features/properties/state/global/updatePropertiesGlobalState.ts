import {
  applyDomainSliceAction,
} from "../../../../application/globalState/reducers/applyDomainSliceAction";

export function updatePropertiesGlobalState(
  payload: unknown,
): void {
  applyDomainSliceAction(
    "properties",
    payload,
  );
}
