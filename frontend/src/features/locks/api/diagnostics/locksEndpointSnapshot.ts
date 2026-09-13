import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getLocksEndpointSnapshot() {
  const resource =
    getApiResource(
      "locks",
    );

  return {
    domain:
      "locks",

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
