import {
  selectCommandEventTrace,
} from "../../../application/eventStream/selectors/selectCommandEventTrace";

export function getSecurityCommandEventTrace(
  commandId: string,
) {
  return selectCommandEventTrace(
    commandId,
  );
}
