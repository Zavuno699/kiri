export interface RuntimeContext {
    tenantId?: string
    operatorId?: string
    permissions: string[]
    environment: string
}
