import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getDevicesApiCoverage() {
  const resource =
    getApiResource(
      "devices",
    );

  return {
    domain:
      "devices",

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
