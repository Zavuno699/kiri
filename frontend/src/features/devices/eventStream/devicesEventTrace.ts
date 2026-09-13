import {
  selectCommandEventTrace,
} from "../../../application/eventStream/selectors/selectCommandEventTrace";

export function getDevicesCommandEventTrace(
  commandId: string,
) {
  return selectCommandEventTrace(
    commandId,
  );
}
