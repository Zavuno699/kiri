import type { PipelineStage } from "../../pipeline/pipelineStage"

export const commandCompletionStage:
  PipelineStage<Record<string, unknown>> = {
  id: "command.completion",

  async execute(input, context) {
    context.metadata.commandCompleted = true
    return input
  },
}
