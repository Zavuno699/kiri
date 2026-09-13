import type { CommandLifecycle } from "./commandLifecycle"

export interface CommandCheckpoint {
  commandId: string
  state: CommandLifecycle
  updatedAt: string
  message?: string
}
