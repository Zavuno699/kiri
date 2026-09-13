import type { PipelineStage } from "../../pipeline/pipelineStage"

export const eventValidationStage:
  PipelineStage<unknown> = {
  id: "event.validate",

  async execute(input, context) {
    context.metadata.eventValidated = true
    return input
  },
}
