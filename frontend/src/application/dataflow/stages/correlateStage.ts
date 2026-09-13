import type { PipelineContext } from "../../pipeline/pipelineContext"
import type { PipelineStage } from "../../pipeline/pipelineStage"

export const correlateStage: PipelineStage<unknown> = {
  id: "correlate",

  async execute(input, context: PipelineContext) {
    context.metadata.correlated = true
    return input
  },
}
