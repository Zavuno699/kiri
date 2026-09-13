import type {
  WorkflowEvent,
} from "./workflowEvent";

const events: WorkflowEvent[] = [];

export function appendWorkflowEvent(
  event: WorkflowEvent,
): void {
  events.push(event);
}

export function listWorkflowEvents(): WorkflowEvent[] {
  return [...events];
}
