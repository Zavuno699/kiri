import {
  registerGlobalStateEffect,
} from "./globalEffectRegistry";

const effects = [
  {
    key:
      "payment.updated.refresh-leases",
    triggerEvent:
      "payment.updated",
    description:
      "Refresh lease state after payment changes",
  },
  {
    key:
      "lease.updated.refresh-devices",
    triggerEvent:
      "lease.updated",
    description:
      "Refresh device authorization state after lease changes",
  },
  {
    key:
      "lease.updated.refresh-locks",
    triggerEvent:
      "lease.updated",
    description:
      "Refresh lock authorization state after lease changes",
  },
  {
    key:
      "device.updated.refresh-dashboard",
    triggerEvent:
      "device.updated",
    description:
      "Refresh dashboard device projection",
  },
  {
    key:
      "lock.updated.refresh-dashboard",
    triggerEvent:
      "lock.updated",
    description:
      "Refresh dashboard lock projection",
  },
  {
    key:
      "security.updated.refresh-workspace",
    triggerEvent:
      "security.updated",
    description:
      "Refresh operator security state",
  },
] as const;

export function registerCanonicalGlobalEffects(): void {
  for (
    const effect of
      effects
  ) {
    registerGlobalStateEffect({
      ...effect,
      enabled:
        true,
    });
  }
}
