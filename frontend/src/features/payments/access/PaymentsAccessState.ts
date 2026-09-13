export interface PaymentsAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function resolvePaymentsAccess(): PaymentsAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
