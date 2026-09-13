import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getPaymentsApiCoverage() {
  const resource =
    getApiResource(
      "payments",
    );

  return {
    domain:
      "payments",

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
