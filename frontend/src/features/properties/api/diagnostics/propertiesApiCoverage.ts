import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getPropertiesApiCoverage() {
  const resource =
    getApiResource(
      "properties",
    );

  return {
    domain:
      "properties",

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
