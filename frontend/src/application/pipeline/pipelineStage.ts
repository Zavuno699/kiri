import type { PipelineContext } from "./pipelineContext"

export interface PipelineStage<T> {
  id: string
  execute(
    input: T,
    context: PipelineContext,
  ): Promise<T>
}
