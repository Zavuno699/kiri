import type {
  ApiRequest,
} from "../contracts/apiRequest";

import type {
  CanonicalApiResponse,
} from "../contracts/apiResponse";

import {
  normalizeQueryParams,
} from "../normalization/normalizeQueryParams";

import {
  normalizeApiError,
} from "../normalization/normalizeApiError";

import {
  normalizeApiResponse,
} from "../normalization/normalizeApiResponse";

import {
  buildApiHeaders,
} from "./apiHeaders";

import {
  createApiRequestId,
} from "./apiRequestId";

import {
  CanonicalApiClientError,
} from "./apiClientError";

export async function transportApiRequest<T>(
  request: ApiRequest,
): Promise<
  CanonicalApiResponse<T>
> {
  const requestId =
    createApiRequestId();

  const query =
    normalizeQueryParams(
      request.query,
    );

  const response =
    await fetch(
      `${request.path}${query}`,
      {
        method:
          request.method,
        headers:
          buildApiHeaders(
            request.headers,
          ),
        body:
          request.body ===
          undefined
            ? undefined
            : JSON.stringify(
                request.body,
              ),
      },
    );

  const text =
    await response.text();

  let body: unknown =
    null;

  if (text) {
    try {
      body =
        JSON.parse(text);
    } catch {
      body =
        text;
    }
  }

  if (!response.ok) {
    throw new CanonicalApiClientError(
      normalizeApiError(
        response.status,
        body,
        requestId,
      ),
    );
  }

  return normalizeApiResponse<T>(
    response.status,
    body,
    requestId,
  );
}
