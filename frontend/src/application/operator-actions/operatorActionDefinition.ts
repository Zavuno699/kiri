export interface OperatorActionDefinition {
  id: string
  domain: string
  label: string
  commandType: string
  destructive: boolean
  confirmationRequired: boolean
  enabled: boolean
  reason?: string
}
