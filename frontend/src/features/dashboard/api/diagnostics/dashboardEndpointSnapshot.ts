import {
  getApiResource,
} from "../../../../application/api/resources/resourceRegistry";

export function getDashboardEndpointSnapshot() {
  const resource =
    getApiResource(
      "dashboard",
    );

  return {
    domain:
      "dashboard",

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
