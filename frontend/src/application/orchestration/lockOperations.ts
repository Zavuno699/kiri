export interface LockOperations {
  load(lockId: string): Promise<never>
  command(lockId: string, command: string): Promise<never>
}

function unavailable(): never {
  throw new Error(
    "Lock operations are unavailable until verified production HTTP ingress exists.",
  )
}

export function createLockOperations(): LockOperations {
  return {
    load: async () => unavailable(),
    command: async () => unavailable(),
  }
}
