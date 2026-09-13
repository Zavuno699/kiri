import type {
  HttpRequest,
  HttpResponse,
} from "../../api/contracts"

export interface HttpTransport {
  request<TRequest, TResponse>(
    request: HttpRequest<TRequest>,
  ): Promise<HttpResponse<TResponse>>
}
