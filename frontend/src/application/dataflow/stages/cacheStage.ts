import type { PipelineContext } from "../../pipeline/pipelineContext"
import type { PipelineStage } from "../../pipeline/pipelineStage"

export const cacheStage: PipelineStage<unknown> = {
  id: "cache",

  async execute(input, context: PipelineContext) {
    context.metadata.cached = true
    return input
  },
}
