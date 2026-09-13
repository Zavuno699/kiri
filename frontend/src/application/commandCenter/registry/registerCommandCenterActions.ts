import {
  registerCommandCenterAction,
} from "./commandCenterActionRegistry";

const actions = [
  {
    key:
      "command-center.refresh",
    label:
      "Refresh command center",
    capability:
      "dashboard.read",
    dangerous:
      false,
  },
  {
    key:
      "command-center.safe-mode",
    label:
      "Enter safe mode",
    capability:
      "runtime.control",
    dangerous:
      true,
  },
  {
    key:
      "command-center.recover",
    label:
      "Recover runtime",
    capability:
      "recovery.execute",
    dangerous:
      true,
  },
  {
    key:
      "command-center.security-freeze",
    label:
      "Freeze security",
    capability:
      "security.control",
    dangerous:
      true,
  },
  {
    key:
      "command-center.reconcile",
    label:
      "Reconcile system",
    capability:
      "runtime.control",
    dangerous:
      true,
  },
];

export function registerCanonicalCommandCenterActions(): void {
  for (
    const action of actions
  ) {
    registerCommandCenterAction({
      ...action,
      enabled:
        true,
    });
  }
}
