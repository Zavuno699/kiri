import {
  listEventsForCommand,
} from "../traceability/commandEventRegistry";

export function selectCommandEventTrace(
  commandId: string,
) {
  return listEventsForCommand(
    commandId,
  );
}
