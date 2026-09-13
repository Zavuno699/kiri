import type { PipelineContext } from "../../pipeline/pipelineContext"
import type { PipelineStage } from "../../pipeline/pipelineStage"

export const normalizeStage: PipelineStage<unknown> = {
  id: "normalize",

  async execute(input, _context: PipelineContext) {
    return input
  },
}
