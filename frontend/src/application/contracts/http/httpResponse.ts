export interface HttpResponse<TBody = unknown> {
  status: number
  headers: Record<string, string>
  body: TBody
}
