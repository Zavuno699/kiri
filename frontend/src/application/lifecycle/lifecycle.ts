export interface Lifecycle {
  start(): Promise<void>
  stop(): Promise<void>
  isStarted(): boolean
}

export class BasicLifecycle
  implements Lifecycle
{
  private started = false

  async start(): Promise<void> {
    this.started = true
  }

  async stop(): Promise<void> {
    this.started = false
  }

  isStarted(): boolean {
    return this.started
  }
}
