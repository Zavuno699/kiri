import type { PipelineStage } from "../../pipeline/pipelineStage"

export const eventDecodeStage:
  PipelineStage<unknown> = {
  id: "event.decode",

  async execute(input) {
    return input
  },
}
