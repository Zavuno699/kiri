export interface PaymentLiveTimeline {
  id: string
  title: string
  type: string
  occurredAt: string
}

export function appendPaymentLiveTimeline(
  current: PaymentLiveTimeline[],
  item: PaymentLiveTimeline,
): PaymentLiveTimeline[] {
  return [
    item,
    ...current,
  ]
}
