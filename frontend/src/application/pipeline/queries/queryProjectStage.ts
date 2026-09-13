import type { PipelineStage } from "../../pipeline/pipelineStage"

export const queryProjectStage:
  PipelineStage<unknown> = {
  id: "query.project",

  async execute(input, context) {
    context.metadata.queryProjected = true
    return input
  },
}
