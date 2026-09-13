import type { PipelineContext } from "../../pipeline/pipelineContext"
import type { PipelineStage } from "../../pipeline/pipelineStage"

export const projectStage: PipelineStage<unknown> = {
  id: "project",

  async execute(input, _context: PipelineContext) {
    return input
  },
}
