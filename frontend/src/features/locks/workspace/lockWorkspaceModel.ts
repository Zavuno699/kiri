export interface LockWorkspaceModel {
  domain: string
  title: string
  entityId?: string
  loading: boolean
  degraded: boolean
  readOnly: boolean
}
