export interface DomainModule {
  id: string
  label: string
  enabled: boolean
  readOnly: boolean
  initialize(): Promise<void>
  shutdown(): Promise<void>
}
