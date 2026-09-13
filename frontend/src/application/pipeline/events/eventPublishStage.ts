import type { PipelineStage } from "../../pipeline/pipelineStage"

export const eventPublishStage:
  PipelineStage<unknown> = {
  id: "event.publish",

  async execute(input, context) {
    context.metadata.eventPublished = true
    return input
  },
}
