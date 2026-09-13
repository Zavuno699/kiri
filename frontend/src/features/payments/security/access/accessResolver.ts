export interface PaymentsAccessState {
  read: boolean
  write: boolean
  reason: string | null
}

export function resolvePaymentsAccess(): PaymentsAccessState {
  return {
    read: true,
    write: false,
    reason: null,
  }
}
