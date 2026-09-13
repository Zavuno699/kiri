import { lockHttpBoundary } from "../../api/resources/lockResource"

export function createLockCoordinator() {
  return {
    httpBoundary:
      lockHttpBoundary,

    async list(): Promise<never[]> {
      throw new Error(
        lockHttpBoundary.reason,
      )
    },

    async executeCommand(): Promise<never> {
      throw new Error(
        "Lock command execution is fail-closed until HTTP ingress is verified.",
      )
    },
  }
}
