import type { PipelineContext } from "../../pipeline/pipelineContext"
import type { PipelineStage } from "../../pipeline/pipelineStage"

export const validateStage: PipelineStage<unknown> = {
  id: "validate",

  async execute(input, _context: PipelineContext) {
    if (input === undefined || input === null) {
      throw new Error("Pipeline input is required.")
    }

    return input
  },
}
