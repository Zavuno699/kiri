import type {
  StateInvariantDefinition,
} from "../contracts/stateInvariant";

function createBooleanInvariant(
  id: string,
  domain: string,
  label: string,
  description: string,
  key: string,
  expected: boolean,
  severity:
    | "warning"
    | "critical",
): StateInvariantDefinition {
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
    severity,
    validate:
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

export function createActiveLeaseInvariant(): StateInvariantDefinition {
  return createBooleanInvariant(
    "lease.active-context",
    "leases",
    "Active lease invariant",
    "Active lease state requires active lease context.",
    "leaseActive",
    true,
    "critical",
  );
}

export function createDeviceOnlineInvariant(): StateInvariantDefinition {
  return createBooleanInvariant(
    "device.online-integrity",
    "devices",
    "Device online invariant",
    "Online device state requires operational device context.",
    "deviceOperational",
    true,
    "critical",
  );
}

export function createLockSecurityInvariant(): StateInvariantDefinition {
  return createBooleanInvariant(
    "lock.security-integrity",
    "locks",
    "Lock security invariant",
    "Lock state requires compatible security context.",
    "securityClear",
    true,
    "critical",
  );
}

export function createPaymentIntegrityInvariant(): StateInvariantDefinition {
  return createBooleanInvariant(
    "payment.integrity",
    "payments",
    "Payment integrity invariant",
    "Completed payment state requires consistent financial context.",
    "paymentConsistent",
    true,
    "critical",
  );
}

export function createPropertyLifecycleInvariant(): StateInvariantDefinition {
  return createBooleanInvariant(
    "property.lifecycle",
    "properties",
    "Property lifecycle invariant",
    "Active property lifecycle requires valid operational context.",
    "propertyOperational",
    true,
    "warning",
  );
}

export function createSecurityInvariant(): StateInvariantDefinition {
  return createBooleanInvariant(
    "security.integrity",
    "security",
    "Security integrity invariant",
    "Clear security state requires security controls to be available.",
    "securityControlsAvailable",
    true,
    "critical",
  );
}
