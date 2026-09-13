export interface RuntimeService {
  id: string
  start(): Promise<void>
  stop(): Promise<void>
}
