import type {
  CommandState,
} from "./commandState"

export type CommandAction<T> =
  | {
      type: "draft"
      payload: T
    }
  | {
      type: "validating"
    }
  | {
      type: "authorized"
      correlationId: string
    }
  | {
      type: "submitted"
      commandId: string
    }
  | {
      type: "accepted"
    }
  | {
      type: "rejected"
      error: string
    }
  | {
      type: "failed"
      error: string
    }
  | {
      type: "complete"
    }
  | {
      type: "reset"
    }

export function reduceCommand<T>(
  state: CommandState<T>,
  action: CommandAction<T>,
): CommandState<T> {
  switch (action.type) {
    case "draft":
      return {
        ...state,
        lifecycle: "draft",
        payload: action.payload,
        error: undefined,
      }

    case "validating":
      return {
        ...state,
        lifecycle: "validating",
      }

    case "authorized":
      return {
        ...state,
        lifecycle: "authorized",
        correlationId:
          action.correlationId,
      }

    case "submitted":
      return {
        ...state,
        lifecycle: "submitted",
        commandId: action.commandId,
      }

    case "accepted":
      return {
        ...state,
        lifecycle: "accepted",
      }

    case "rejected":
      return {
        ...state,
        lifecycle: "rejected",
        error: action.error,
      }

    case "failed":
      return {
        ...state,
        lifecycle: "failed",
        error: action.error,
      }

    case "complete":
      return {
        ...state,
        lifecycle: "complete",
      }

    case "reset":
      return {
        lifecycle: "idle",
      }
  }
}
