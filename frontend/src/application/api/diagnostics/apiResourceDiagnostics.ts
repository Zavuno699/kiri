import {
  listApiResources,
} from "../resources/resourceRegistry";

export function getApiResourceDiagnostics() {
  return {
    resourceCount:
      listApiResources().length,

    resources:
      listApiResources().map(
        (resource) => ({
          key:
            resource.key,
          domain:
            resource.domain,
          collectionPath:
            resource.collectionPath,
          readCapability:
            resource.readCapability,
          writeCapability:
            resource.writeCapability ??
            null,
          commandCapability:
            resource.commandCapability ??
            null,
          backendVerified:
            resource.backendVerified ??
            false,
        }),
      ),
  };
}
