import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getSecurityApiCoverage() {
  const resource =
    getApiResource(
      "security",
    );

  return {
    domain:
      "security",

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
