import { finalHealthRegistry } from "./finalHealthRegistry";

export function calculateFinalReadiness() {
  const blocked = finalHealthRegistry.filter(
    (item) => item.state === "blocked",
  );
  const degraded = finalHealthRegistry.filter(
    (item) => item.state === "degraded",
  );

  return {
    ready: blocked.length === 0,
    blocked: blocked.length,
    degraded: degraded.length,
  };
}
