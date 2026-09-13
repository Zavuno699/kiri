import {
  listApiResources,
} from "../resources/resourceRegistry";

export function getApiCoverageSnapshot() {
  const resources =
    listApiResources();

  return {
    total:
      resources.length,

    backendVerified:
      resources.filter(
        (resource) =>
          resource.backendVerified ===
          true,
      ).length,

    readable:
      resources.filter(
        (resource) =>
          Boolean(
            resource.readCapability,
          ),
      ).length,

    writable:
      resources.filter(
        (resource) =>
          Boolean(
            resource.writeCapability,
          ),
      ).length,

    commandable:
      resources.filter(
        (resource) =>
          Boolean(
            resource.commandCapability,
          ),
      ).length,
  };
}
