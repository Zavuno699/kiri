export interface PipelineResult<T> {
  status: "success" | "partial" | "blocked" | "failed"
  value?: T
  message?: string
  correlationId?: string
}
