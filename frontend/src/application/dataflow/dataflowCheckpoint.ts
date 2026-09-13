export interface DataflowCheckpoint {
  pipelineId: string
  stageId: string
  sequence: number
  completed: boolean
  updatedAt: string
}
