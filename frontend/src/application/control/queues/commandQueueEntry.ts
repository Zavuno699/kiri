export interface CommandQueueEntry<T = unknown> {
  id: string
  type: string
  domain: string
  payload: T
  state:
    | "queued"
    | "running"
    | "completed"
    | "failed"
    | "blocked"
  createdAt: string
  startedAt?: string
  completedAt?: string
  error?: string
}
