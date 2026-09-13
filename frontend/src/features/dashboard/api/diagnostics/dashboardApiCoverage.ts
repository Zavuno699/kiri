import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getDashboardApiCoverage() {
  const resource =
    getApiResource(
      "dashboard",
    );

  return {
    domain:
      "dashboard",

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
