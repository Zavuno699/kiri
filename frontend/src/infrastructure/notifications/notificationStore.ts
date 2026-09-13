import type {
  OperatorNotification,
} from "./notificationTypes"

type Listener =
  (items: OperatorNotification[]) => void

export class NotificationStore {
  private items:
    OperatorNotification[] = []

  private listeners =
    new Set<Listener>()

  getAll(): OperatorNotification[] {
    return [...this.items]
  }

  push(
    notification: OperatorNotification,
  ): void {
    this.items = [
      notification,
      ...this.items,
    ]

    this.emit()
  }

  dismiss(id: string): void {
    this.items =
      this.items.filter(
        (item) => item.id !== id,
      )

    this.emit()
  }

  subscribe(
    listener: Listener,
  ): () => void {
    this.listeners.add(listener)

    return () =>
      this.listeners.delete(listener)
  }

  private emit(): void {
    const snapshot = this.getAll()

    for (const listener of this.listeners) {
      listener(snapshot)
    }
  }
}

export const notificationStore =
  new NotificationStore()
