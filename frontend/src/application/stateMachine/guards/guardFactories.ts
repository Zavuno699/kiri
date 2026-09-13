import type {
  StateGuardDefinition,
} from "../contracts/stateGuard";

function createBooleanGuard(
  id: string,
  domain: string,
  label: string,
  description: string,
  key: string,
  expected: boolean,
): StateGuardDefinition {
  return {
    id,
    domain,
    name:
      id.replace(
        /\./g,
        "-",
      ),
    label,
    description,
    required:
      true,
    evaluate:
      (context) =>
        context.context[key] ===
        expected
          ? "pass"
          : context.context[key] ===
              undefined
            ? "unknown"
            : "fail",
  };
}

export function createAuthenticationGuard(): StateGuardDefinition {
  return createBooleanGuard(
    "global.authenticated",
    "global",
    "Authenticated subject",
    "Lifecycle transitions require authenticated authority.",
    "authenticated",
    true,
  );
}

export function createLeaseContextGuard(): StateGuardDefinition {
  return createBooleanGuard(
    "leases.context-active",
    "leases",
    "Lease context",
    "Lease-dependent transitions require active context.",
    "leaseActive",
    true,
  );
}

export function createDeviceOperationalGuard(): StateGuardDefinition {
  return createBooleanGuard(
    "devices.operational",
    "devices",
    "Device operational",
    "Device transitions require operational context where applicable.",
    "deviceOperational",
    true,
  );
}

export function createLockControllableGuard(): StateGuardDefinition {
  return createBooleanGuard(
    "locks.controllable",
    "locks",
    "Lock controllable",
    "Lock transitions require controllable state.",
    "lockControllable",
    true,
  );
}

export function createSecurityClearGuard(): StateGuardDefinition {
  return createBooleanGuard(
    "security.clear",
    "security",
    "Security clear",
    "Protected transitions require clear security state.",
    "securityClear",
    true,
  );
}

export function createPaymentConsistentGuard(): StateGuardDefinition {
  return createBooleanGuard(
    "payments.consistent",
    "payments",
    "Payment consistent",
    "Payment lifecycle transitions require consistent financial state.",
    "paymentConsistent",
    true,
  );
}
