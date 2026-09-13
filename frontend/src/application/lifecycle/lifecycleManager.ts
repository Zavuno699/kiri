import type {
  Lifecycle,
} from "./lifecycle"

export class LifecycleManager {
  private readonly lifecycles:
    Lifecycle[] = []

  register(
    lifecycle: Lifecycle,
  ): void {
    this.lifecycles.push(lifecycle)
  }

  async start(): Promise<void> {
    for (const lifecycle of this.lifecycles) {
      await lifecycle.start()
    }
  }

  async stop(): Promise<void> {
    for (
      const lifecycle of [...this.lifecycles].reverse()
    ) {
      await lifecycle.stop()
    }
  }
}
