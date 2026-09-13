export interface LockTimelineEvent {
  id: string
  lockId: string
  commandId?: string
  type: string
  message: string
  occurredAt: string
}
