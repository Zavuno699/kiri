import type { PipelineContext } from "../../pipeline/pipelineContext"
import type { PipelineStage } from "../../pipeline/pipelineStage"

export const reconcileStage: PipelineStage<unknown> = {
  id: "reconcile",

  async execute(input, context: PipelineContext) {
    context.metadata.reconciled = true
    return input
  },
}
