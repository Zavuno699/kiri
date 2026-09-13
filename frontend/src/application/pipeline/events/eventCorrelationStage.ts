import type { PipelineStage } from "../../pipeline/pipelineStage"

export const eventCorrelationStage:
  PipelineStage<unknown> = {
  id: "event.correlate",

  async execute(input, context) {
    context.metadata.eventCorrelated = true
    return input
  },
}
