export interface CommandErrorContract {
  commandId?: string
  code: string
  message: string
  retryable: boolean
}
