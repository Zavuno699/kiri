import {
  getApiResource,
} from "./resourceRegistry";

import {
  transportApiRequest,
} from "../runtime/canonicalApiTransport";

export function createResourceAdapter(
  resourceKey: string,
) {
  const resource =
    getApiResource(
      resourceKey,
    );

  if (!resource) {
    throw new Error(
      `Unknown API resource: ${resourceKey}`,
    );
  }

  return {
    async list<
      TResult = unknown,
    >(
      query?: Record<
        string,
        string | number | boolean | undefined
      >,
    ) {
      return transportApiRequest<TResult>({
        method: "GET",
        path:
          resource.collectionPath,
        query,
        capability:
          resource.readCapability,
      });
    },

    async get<
      TResult = unknown,
    >(
      id: string,
    ) {
      if (
        !resource.detailPath
      ) {
        throw new Error(
          `No detail endpoint for ${resourceKey}`,
        );
      }

      return transportApiRequest<TResult>({
        method: "GET",
        path:
          resource.detailPath(id),
        capability:
          resource.readCapability,
      });
    },

    async create<
      TBody = unknown,
      TResult = unknown,
    >(
      body: TBody,
    ) {
      if (
        !resource.writeCapability
      ) {
        throw new Error(
          `Resource is read-only: ${resourceKey}`,
        );
      }

      return transportApiRequest<TResult>({
        method: "POST",
        path:
          resource.collectionPath,
        body,
        capability:
          resource.writeCapability,
      });
    },

    async update<
      TBody = unknown,
      TResult = unknown,
    >(
      id: string,
      body: TBody,
    ) {
      if (
        !resource.detailPath ||
        !resource.writeCapability
      ) {
        throw new Error(
          `Resource update unavailable: ${resourceKey}`,
        );
      }

      return transportApiRequest<TResult>({
        method: "PATCH",
        path:
          resource.detailPath(id),
        body,
        capability:
          resource.writeCapability,
      });
    },

    async remove<
      TResult = unknown,
    >(
      id: string,
    ) {
      if (
        !resource.detailPath ||
        !resource.writeCapability
      ) {
        throw new Error(
          `Resource delete unavailable: ${resourceKey}`,
        );
      }

      return transportApiRequest<TResult>({
        method: "DELETE",
        path:
          resource.detailPath(id),
        capability:
          resource.writeCapability,
      });
    },
  };
}
