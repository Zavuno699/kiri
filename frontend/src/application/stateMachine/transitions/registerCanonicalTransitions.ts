import {
  registerTransition,
} from "../registry/transitionRegistry";

const transitions = [
  {
    id:
      "property.activate",
    domain:
      "properties",
    name:
      "activate",
    label:
      "Activate property",
    description:
      "Move property from draft to active state.",
    fromStates:
      [
        "property.draft",
      ],
    toState:
      "property.active",
    action:
      "property.activate",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "property.suspend",
    domain:
      "properties",
    name:
      "suspend",
    label:
      "Suspend property",
    description:
      "Suspend an active property.",
    fromStates:
      [
        "property.active",
      ],
    toState:
      "property.suspended",
    action:
      "property.suspend",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "property.resume",
    domain:
      "properties",
    name:
      "Resume property",
    description:
      "Return a suspended property to active state.",
    fromStates:
      [
        "property.suspended",
      ],
    toState:
      "property.active",
    action:
      "property.resume",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },

  {
    id:
      "lease.activate",
    domain:
      "leases",
    name:
      "activate",
    label:
      "Activate lease",
    description:
      "Move pending lease into active state.",
    fromStates:
      [
        "lease.pending",
      ],
    toState:
      "lease.active",
    action:
      "lease.activate",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "lease.suspend",
    domain:
      "leases",
    name:
      "suspend",
    label:
      "Suspend lease",
    description:
      "Suspend an active lease.",
    fromStates:
      [
        "lease.active",
      ],
    toState:
      "lease.suspended",
    action:
      "lease.suspend",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "lease.resume",
    domain:
      "leases",
    name:
      "resume",
    label:
      "Resume lease",
    description:
      "Resume a suspended lease.",
    fromStates:
      [
        "lease.suspended",
      ],
    toState:
      "lease.active",
    action:
      "lease.resume",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "lease.terminate",
    domain:
      "leases",
    name:
      "terminate",
    label:
      "Terminate lease",
    description:
      "Terminate an active or suspended lease.",
    fromStates:
      [
        "lease.active",
        "lease.suspended",
      ],
    toState:
      "lease.terminated",
    action:
      "lease.terminate",
    guarded:
      true,
    reversible:
      false,
    enabled:
      true,
  },

  {
    id:
      "payment.complete",
    domain:
      "payments",
    name:
      "complete",
    label:
      "Complete payment",
    description:
      "Mark a pending payment as completed.",
    fromStates:
      [
        "payment.pending",
      ],
    toState:
      "payment.completed",
    action:
      "payment.complete",
    guarded:
      true,
    reversible:
      false,
    enabled:
      true,
  },
  {
    id:
      "payment.fail",
    domain:
      "payments",
    name:
      "fail",
    label:
      "Fail payment",
    description:
      "Mark a pending payment as failed.",
    fromStates:
      [
        "payment.pending",
      ],
    toState:
      "payment.failed",
    action:
      "payment.fail",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },

  {
    id:
      "device.connect",
    domain:
      "devices",
    name:
      "connect",
    label:
      "Connect device",
    description:
      "Transition a registered device online.",
    fromStates:
      [
        "device.registered",
        "device.offline",
      ],
    toState:
      "device.online",
    action:
      "device.connect",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "device.disconnect",
    domain:
      "devices",
    name:
      "disconnect",
    label:
      "Disconnect device",
    description:
      "Transition an online device offline.",
    fromStates:
      [
        "device.online",
      ],
    toState:
      "device.offline",
    action:
      "device.disconnect",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "device.quarantine",
    domain:
      "devices",
    name:
      "quarantine",
    label:
      "Quarantine device",
    description:
      "Isolate device under security control.",
    fromStates:
      [
        "device.registered",
        "device.online",
        "device.offline",
      ],
    toState:
      "device.quarantined",
    action:
      "device.quarantine",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },

  {
    id:
      "lock.release",
    domain:
      "locks",
    name:
      "release",
    label:
      "Release lock",
    description:
      "Release a secured lock.",
    fromStates:
      [
        "lock.secured",
      ],
    toState:
      "lock.released",
    action:
      "lock.release",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "lock.secure",
    domain:
      "locks",
    name:
      "secure",
    label:
      "Secure lock",
    description:
      "Secure a released lock.",
    fromStates:
      [
        "lock.released",
      ],
    toState:
      "lock.secured",
    action:
      "lock.secure",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "lock.freeze",
    domain:
      "locks",
    name:
      "freeze",
    label:
      "Freeze lock",
    description:
      "Freeze lock transitions.",
    fromStates:
      [
        "lock.secured",
        "lock.released",
      ],
    toState:
      "lock.frozen",
    action:
      "lock.freeze",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "lock.unfreeze",
    domain:
      "locks",
    name:
      "unfreeze",
    label:
      "Unfreeze lock",
    description:
      "Return a frozen lock to secured state.",
    fromStates:
      [
        "lock.frozen",
      ],
    toState:
      "lock.secured",
    action:
      "lock.unfreeze",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },

  {
    id:
      "security.freeze",
    domain:
      "security",
    name:
      "freeze",
    label:
      "Freeze security",
    description:
      "Enter emergency security freeze.",
    fromStates:
      [
        "security.clear",
        "security.recovering",
      ],
    toState:
      "security.frozen",
    action:
      "security.freeze",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "security.recover",
    domain:
      "security",
    name:
      "recover",
    label:
      "Start security recovery",
    description:
      "Begin controlled security recovery.",
    fromStates:
      [
        "security.frozen",
      ],
    toState:
      "security.recovering",
    action:
      "security.recover",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },
  {
    id:
      "security.clear",
    domain:
      "security",
    name:
      "clear",
    label:
      "Clear security",
    description:
      "Return recovering security state to clear.",
    fromStates:
      [
        "security.recovering",
      ],
    toState:
      "security.clear",
    action:
      "security.clear",
    guarded:
      true,
    reversible:
      true,
    enabled:
      true,
  },

  {
    id:
      "dashboard.ready",
    domain:
      "dashboard",
    name:
      "ready",
    label:
      "Mark dashboard ready",
    description:
      "Mark dashboard lifecycle ready.",
    fromStates:
      [
        "dashboard.ready",
      ],
    toState:
      "dashboard.ready",
    action:
      "dashboard.ready",
    guarded:
      false,
    reversible:
      false,
    enabled:
      true,
  },
];

export function registerCanonicalTransitions(): void {
  for (
    const transition of
      transitions
  ) {
    registerTransition(
      transition,
    );
  }
}
