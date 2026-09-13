import type {
  StateGuard,
} from "../contracts/stateGuard";

function requireStateValue(
  id: string,
  domain: string,
  name: string,
  label: string,
  description: string,
  key: string,
  expected: unknown,
): StateGuard {
  return {
    id,
    domain,
    name,
    label,
    description,
    required:
      true,
    evaluate:
      (context) =>
        context.state[key] ===
        expected
          ? "pass"
          : context.state[key] ===
              undefined
            ? "unknown"
            : "fail",
  };
}

export function createActiveLeaseGuard(): StateGuard {
  return requireStateValue(
    "lease.active",
    "leases",
    "active-lease",
    "Active lease",
    "Lease-dependent actions require an active lease.",
    "active",
    true,
  );
}

export function createDeviceOperationalGuard(): StateGuard {
  return requireStateValue(
    "device.operational",
    "devices",
    "device-operational",
    "Operational device",
    "Device actions require an operational device.",
    "operational",
    true,
  );
}

export function createLockControllableGuard(): StateGuard {
  return requireStateValue(
    "lock.controllable",
    "locks",
    "lock-controllable",
    "Controllable lock",
    "Lock transitions require a controllable lock.",
    "controllable",
    true,
  );
}

export function createSecurityClearGuard(): StateGuard {
  return requireStateValue(
    "security.clear",
    "security",
    "security-clear",
    "Security clear",
    "Protected operations require clear security state.",
    "frozen",
    false,
  );
}

export function createPaymentConsistentGuard(): StateGuard {
  return requireStateValue(
    "payment.consistent",
    "payments",
    "payment-consistent",
    "Payment consistency",
    "Financially sensitive operations require consistent payment state.",
    "consistent",
    true,
  );
}
