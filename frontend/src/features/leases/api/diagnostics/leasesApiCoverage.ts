import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getLeasesApiCoverage() {
  const resource =
    getApiResource(
      "leases",
    );

  return {
    domain:
      "leases",

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
