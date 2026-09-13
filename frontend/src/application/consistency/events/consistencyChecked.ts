export interface ConsistencyCheckedEvent {
  type: "consistency.checked"
  occurredAt: string
  consistent: boolean
}
