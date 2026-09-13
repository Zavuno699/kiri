import {
  getApiResource,
} from "./resourceRegistry";

export function getCollectionPath(
  resourceKey: string,
): string {
  const resource =
    getApiResource(
      resourceKey,
    );

  if (!resource) {
    throw new Error(
      `Unknown resource: ${resourceKey}`,
    );
  }

  return resource.collectionPath;
}

export function getDetailPath(
  resourceKey: string,
  id: string,
): string {
  const resource =
    getApiResource(
      resourceKey,
    );

  if (
    !resource ||
    !resource.detailPath
  ) {
    throw new Error(
      `Resource detail path unavailable: ${resourceKey}`,
    );
  }

  return resource.detailPath(
    id,
  );
}
