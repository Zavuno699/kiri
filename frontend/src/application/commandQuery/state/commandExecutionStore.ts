import type {
  CommandExecutionState,
} from "../contracts/commandExecutionState";

let state: CommandExecutionState = {
  activeCommandId:
    null,
  entityId:
    null,
  status:
    "idle",
  message:
    null,
  correlationId:
    null,
  startedAt:
    null,
  completedAt:
    null,
};

const listeners = new Set<
  () => void
>();

export function getCommandExecutionState(): CommandExecutionState {
  return {
    ...state,
  };
}

export function setCommandExecutionState(
  patch:
    Partial<CommandExecutionState>,
): void {
  state = {
    ...state,
    ...patch,
  };

  for (
    const listener of
      listeners
  ) {
    listener();
  }
}

export function subscribeCommandExecution(
  listener: () => void,
): () => void {
  listeners.add(
    listener,
  );

  return () => {
    listeners.delete(
      listener,
    );
  };
}
