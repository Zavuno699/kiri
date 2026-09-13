import {
  selectCommandEventTrace,
} from "../../../application/eventStream/selectors/selectCommandEventTrace";

export function getPaymentsCommandEventTrace(
  commandId: string,
) {
  return selectCommandEventTrace(
    commandId,
  );
}
