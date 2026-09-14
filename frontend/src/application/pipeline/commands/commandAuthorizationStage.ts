import type { PipelineStage } from "../pipelineStage"
import type { PipelineContext } from "../pipelineContext"

export const commandAuthorizationStage:
  PipelineStage<Record<string, unknown>> = {
  id: "command.authorization",

  async execute(input: Record<string, unknown>, _context: PipelineContext): Promise<Record<string, unknown>> {
    return input
  },
}
