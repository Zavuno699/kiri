export interface ConfirmationManager {
  request(
    commandId: string,
    reason?: string,
  ): void

  confirm(commandId: string): void
  cancel(commandId: string): void
  isConfirmed(commandId: string): boolean
}

export function createConfirmationManager():
  ConfirmationManager {
  const states = new Map<string, boolean>()

  return {
    request(commandId) {
      states.set(commandId, false)
    },

    confirm(commandId) {
      states.set(commandId, true)
    },

    cancel(commandId) {
      states.delete(commandId)
    },

    isConfirmed(commandId) {
      return states.get(commandId) === true
    },
  }
}
