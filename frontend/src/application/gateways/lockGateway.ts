import type {
  LockRecord,
} from "../../features/locks/types/lock"

export interface LockGateway {
  listLocks(): Promise<LockRecord[]>
  sendCommand(
    id: string,
    command: string,
    reason: string,
  ): Promise<never>
}
