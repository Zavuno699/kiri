import {
  createLockCoordinator,
} from "../../../application/locks/lockCoordinator"
import { lockStore } from "../stores/lockStore"

const coordinator =
  createLockCoordinator()

export async function loadLocks() {
  try {
    lockStore.setLoading(true)

    const locks =
      await coordinator.list()

    lockStore.setItems(locks)

    return locks
  } catch (error) {
    lockStore.setError(
      error instanceof Error
        ? error.message
        : "Lock HTTP ingress unavailable.",
    )

    throw error
  } finally {
    lockStore.setLoading(false)
  }
}
