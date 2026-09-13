import type { PipelineContext } from "./pipelineContext"
import type { PipelineStage } from "./pipelineStage"

export async function executePipeline<T>(
  input: T,
  context: PipelineContext,
  stages: PipelineStage<T>[],
): Promise<T> {
  let current = input

  for (const stage of stages) {
    current = await stage.execute(
      current,
      context,
    )
  }

  return current
}
