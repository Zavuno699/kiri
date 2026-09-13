export interface PropagationEvent {
  id: string
  sourceDomain: string
  sourceId?: string
  targetDomain: string
  targetId?: string
  type: string
  occurredAt: string
}
