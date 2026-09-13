import type { PipelineStage } from "../../pipeline/pipelineStage"

export const commandDispatchStage:
  PipelineStage<Record<string, unknown>> = {
  id: "command.dispatch",

  async execute(input, context) {
    context.metadata.commandDispatched = true
    return input
  },
}
