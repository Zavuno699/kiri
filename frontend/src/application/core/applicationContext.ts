export interface ApplicationContext {
  correlationId?: string
  tenantId?: string
  operatorId?: string
  environment: string
}

export function createApplicationContext(
  environment = "unknown",
): ApplicationContext {
  return {
    environment,
  }
}
