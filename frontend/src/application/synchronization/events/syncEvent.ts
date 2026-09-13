export interface SyncEvent {
  id: string
  key: string
  type:
    | "queued"
    | "started"
    | "completed"
    | "failed"
    | "conflict"
  occurredAt: string
}
