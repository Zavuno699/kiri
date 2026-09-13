import type { PipelineStage } from "../../pipeline/pipelineStage"

export const queryCacheStage:
  PipelineStage<unknown> = {
  id: "query.cache",

  async execute(input, context) {
    context.metadata.queryCached = true
    return input
  },
}
