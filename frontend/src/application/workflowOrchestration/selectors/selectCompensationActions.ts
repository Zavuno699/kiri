import {
  listCompensationForWorkflow,
} from "../compensation/compensationRegistry";

export function selectCompensationActions(
  workflowId: string,
) {
  return listCompensationForWorkflow(
    workflowId,
  );
}
