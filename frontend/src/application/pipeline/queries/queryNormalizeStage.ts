import type { PipelineStage } from "../../pipeline/pipelineStage"

export const queryNormalizeStage:
  PipelineStage<unknown> = {
  id: "query.normalize",

  async execute(input, context) {
    context.metadata.queryNormalized = true
    return input
  },
}
