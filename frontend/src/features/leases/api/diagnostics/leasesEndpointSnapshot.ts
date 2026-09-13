import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getLeasesEndpointSnapshot() {
  const resource =
    getApiResource(
      "leases",
    );

  return {
    domain:
      "leases",

    collection:
      resource?.collectionPath ??
      null,

    detailAvailable:
      Boolean(
        resource?.detailPath,
      ),

    readCapability:
      resource?.readCapability ??
      null,

    writeCapability:
      resource?.writeCapability ??
      null,

    commandCapability:
      resource?.commandCapability ??
      null,

    backendVerified:
      resource?.backendVerified ??
      false,
  };
}
