import type { PropagationEvent } from "./propagationEvent"

export interface PropagationBridge {
  accepts(event: PropagationEvent): boolean
  propagate(event: PropagationEvent): Promise<void>
}
