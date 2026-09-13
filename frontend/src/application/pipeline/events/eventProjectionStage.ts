import type { PipelineStage } from "../../pipeline/pipelineStage"

export const eventProjectionStage:
  PipelineStage<unknown> = {
  id: "event.project",

  async execute(input, context) {
    context.metadata.eventProjected = true
    return input
  },
}
