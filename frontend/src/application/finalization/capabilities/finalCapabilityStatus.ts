import { finalCapabilityRegistry } from "./finalCapabilityRegistry";

export function calculateCapabilityStatus() {
  const total = finalCapabilityRegistry.length;
  const implemented = finalCapabilityRegistry.filter(
    (item) => item.implemented,
  ).length;
  const integrated = finalCapabilityRegistry.filter(
    (item) => item.integrated,
  ).length;
  const buildCritical = finalCapabilityRegistry.filter(
    (item) => item.buildCritical,
  );

  return {
    total,
    implemented,
    integrated,
    buildCritical: buildCritical.length,
    buildCriticalComplete:
      buildCritical.every(
        (item) =>
          item.implemented && item.integrated,
      ),
  };
}
