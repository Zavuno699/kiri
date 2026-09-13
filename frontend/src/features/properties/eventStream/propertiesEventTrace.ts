import {
  selectCommandEventTrace,
} from "../../../application/eventStream/selectors/selectCommandEventTrace";

export function getPropertiesCommandEventTrace(
  commandId: string,
) {
  return selectCommandEventTrace(
    commandId,
  );
}
