import {
  selectCommandEventTrace,
} from "../../../application/eventStream/selectors/selectCommandEventTrace";

export function getLocksCommandEventTrace(
  commandId: string,
) {
  return selectCommandEventTrace(
    commandId,
  );
}
