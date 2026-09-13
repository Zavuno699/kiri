export class ServiceRegistry {
  private readonly services =
    new Map<string, unknown>()

  register<T>(
    token: string,
    service: T,
  ): void {
    this.services.set(token, service)
  }

  resolve<T>(
    token: string,
  ): T {
    const service =
      this.services.get(token)

    if (!service) {
      throw new Error(
        `Service not registered: ${token}`,
      )
    }

    return service as T
  }

  has(token: string): boolean {
    return this.services.has(token)
  }

  clear(): void {
    this.services.clear()
  }
}

export const serviceRegistry =
  new ServiceRegistry()
