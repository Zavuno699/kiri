import type { PipelineStage } from "../../pipeline/pipelineStage"

export const queryLoadStage:
  PipelineStage<unknown> = {
  id: "query.load",

  async execute(input, context) {
    context.metadata.queryLoaded = true
    return input
  },
}
