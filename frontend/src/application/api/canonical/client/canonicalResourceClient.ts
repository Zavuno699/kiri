import type {
  ApiRequestContext,
} from "../contracts/apiRequestContext";
import type {
  ApiResponse,
} from "../contracts/apiResponse";
import type {
  ResourceClient,
} from "./resourceClient";

async function request<T>(
  path: string,
  init: RequestInit,
): Promise<ApiResponse<T>> {
  const receivedAt =
    new Date().toISOString();

  try {
    const response =
      await fetch(path, init);

    const requestId =
      response.headers.get("x-request-id");

    if (!response.ok) {
      return {
        data: null,
        status: response.status,
        requestId,
        error: `HTTP ${response.status}`,
        receivedAt,
      };
    }

    const data =
      (await response.json()) as T;

    return {
      data,
      status: response.status,
      requestId,
      error: null,
      receivedAt,
    };
  } catch (error) {
    return {
      data: null,
      status: 0,
      requestId: null,
      error:
        error instanceof Error
          ? error.message
          : "request-failed",
      receivedAt,
    };
  }
}

function headers(
  context?: ApiRequestContext,
): HeadersInit {
  return {
    "content-type":
      "application/json",
    ...(context?.correlationId
      ? {
          "x-correlation-id":
            context.correlationId,
        }
      : {}),
  };
}

export const canonicalResourceClient:
  ResourceClient = {
    list: <T>(
      path: string,
      context?: ApiRequestContext,
    ) =>
      request<T[]>(
        path,
        {
          method: "GET",
          headers:
            headers(context),
        },
      ),

    get: <T>(
      path: string,
      context?: ApiRequestContext,
    ) =>
      request<T>(
        path,
        {
          method: "GET",
          headers:
            headers(context),
        },
      ),

    create: <TBody, TResponse>(
      path: string,
      body: TBody,
      context?: ApiRequestContext,
    ) =>
      request<TResponse>(
        path,
        {
          method: "POST",
          headers:
            headers(context),
          body:
            JSON.stringify(body),
        },
      ),

    update: <TBody, TResponse>(
      path: string,
      body: TBody,
      context?: ApiRequestContext,
    ) =>
      request<TResponse>(
        path,
        {
          method: "PATCH",
          headers:
            headers(context),
          body:
            JSON.stringify(body),
        },
      ),

    command: <TBody, TResponse>(
      path: string,
      body: TBody,
      context?: ApiRequestContext,
    ) =>
      request<TResponse>(
        path,
        {
          method: "POST",
          headers:
            headers(context),
          body:
            JSON.stringify(body),
        },
      ),
  };
