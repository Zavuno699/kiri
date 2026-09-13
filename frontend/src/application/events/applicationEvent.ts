import type {
  ApplicationEventType,
} from "./eventTypes"

export interface ApplicationEvent<T = unknown> {
  id: string
  type: ApplicationEventType
  occurredAt: string
  correlationId?: string
  causationId?: string
  producer?: string
  payload: T
}
