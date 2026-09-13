import {
  listApiResources,
} from "../resources/resourceRegistry";

export function getApiHealth() {
  const resources =
    listApiResources();

  return {
    initialized:
      resources.length > 0,

    reachable:
      false,

    degraded:
      resources.length !== 7,

    reason:
      resources.length === 7
        ? null
        : "resource-registry-incomplete",

    checkedAt:
      new Date().toISOString(),
  };
}
