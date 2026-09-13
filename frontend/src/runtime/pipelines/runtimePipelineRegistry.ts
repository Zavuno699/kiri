import type { RuntimePipelineDefinition } from "./runtimePipelineDefinition"

export interface RuntimePipelineRegistry {
  register(pipeline: RuntimePipelineDefinition): void
  list(): RuntimePipelineDefinition[]
  get(id: string): RuntimePipelineDefinition | undefined
}

export function createRuntimePipelineRegistry(): RuntimePipelineRegistry {
  const values = new Map<string, RuntimePipelineDefinition>()

  return {
    register(pipeline) {
      values.set(pipeline.id, pipeline)
    },

    list() {
      return [...values.values()]
    },

    get(id) {
      return values.get(id)
    },
  }
}
