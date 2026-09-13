import type { PipelineStage } from "../..//pipelineStage"
import type { CommandPipelineContext } from "./commandPipelineContext"

export const commandAuthorizationStage:
  PipelineStage<Record<string, unknown>> = {
  id: "command.authorization",

  async execute(input, context) {
    if (context.metadata.commandAuthorized === false) {
      throw new Error(
        "Command authorization denied.",
      )
    }

    return input
  },
}
