export interface HttpRequest<TBody = unknown> {
  method: string
  url: string
  headers?: Record<string, string>
  body?: TBody
}
