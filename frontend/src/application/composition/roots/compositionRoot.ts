export interface CompositionRoot {
  id: string
  domain: string
  initialized: boolean
  initialize(): Promise<void>
  shutdown(): Promise<void>
}
