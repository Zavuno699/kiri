import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getLocksApiCoverage() {
  const resource =
    getApiResource(
      "locks",
    );

  return {
    domain:
      "locks",

    configured:
      Boolean(resource),

    collection:
      resource?.collectionPath ??
      null,

    backendVerified:
      resource?.backendVerified ??
      false,
  };
}
