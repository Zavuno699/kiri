export interface Refreshable {
  refresh(): Promise<void>
}

export class RefreshManager {
  private readonly resources:
    Refreshable[] = []

  register(
    resource: Refreshable,
  ): void {
    this.resources.push(resource)
  }

  async refreshAll(): Promise<void> {
    for (const resource of this.resources) {
      await resource.refresh()
    }
  }
}

export const refreshManager =
  new RefreshManager()
