import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getPaymentsEndpointSnapshot() {
  const resource =
    getApiResource(
      "payments",
    );

  return {
    domain:
      "payments",

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
