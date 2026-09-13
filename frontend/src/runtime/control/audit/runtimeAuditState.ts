export interface RuntimeAuditState {
  total: number
  allowed: number
  blocked: number
  failed: number
}

export const initialRuntimeAuditState:
  RuntimeAuditState = {
  total: 0,
  allowed: 0,
  blocked: 0,
  failed: 0,
}
