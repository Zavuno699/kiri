import {
  registerWorkspaceActions,
} from "./workspaceActionRegistry";

const matrix: Record<
  string,
  Array<{
    key: string;
    label: string;
    capability: string;
    dangerous: boolean;
  }>
> = {
  dashboard: [
    {
      key:
        "dashboard.refresh",
      label:
        "Refresh dashboard",
      capability:
        "dashboard.read",
      dangerous:
        false,
    },
  ],

  properties: [
    {
      key:
        "properties.create",
      label:
        "Create property",
      capability:
        "properties.write",
      dangerous:
        false,
    },
    {
      key:
        "properties.update",
      label:
        "Update property",
      capability:
        "properties.write",
      dangerous:
        false,
    },
  ],

  leases: [
    {
      key:
        "leases.update",
      label:
        "Update lease",
      capability:
        "leases.write",
      dangerous:
        false,
    },
    {
      key:
        "leases.terminate",
      label:
        "Terminate lease",
      capability:
        "leases.write",
      dangerous:
        true,
    },
    {
      key:
        "leases.reconcile-payment",
      label:
        "Reconcile payment",
      capability:
        "payments.write",
      dangerous:
        true,
    },
    {
      key:
        "leases.authorize-device",
      label:
        "Authorize device",
      capability:
        "devices.command",
      dangerous:
        true,
    },
    {
      key:
        "leases.authorize-lock",
      label:
        "Authorize lock",
      capability:
        "locks.command",
      dangerous:
        true,
    },
  ],

  payments: [
    {
      key:
        "payments.create",
      label:
        "Create payment",
      capability:
        "payments.write",
      dangerous:
        false,
    },
    {
      key:
        "payments.reconcile",
      label:
        "Reconcile",
      capability:
        "payments.write",
      dangerous:
        true,
    },
  ],

  devices: [
    {
      key:
        "devices.command",
      label:
        "Device command",
      capability:
        "devices.command",
      dangerous:
        true,
    },
    {
      key:
        "devices.update",
      label:
        "Update device",
      capability:
        "devices.write",
      dangerous:
        false,
    },
  ],

  locks: [
    {
      key:
        "locks.command",
      label:
        "Lock command",
      capability:
        "locks.command",
      dangerous:
        true,
    },
    {
      key:
        "locks.update",
      label:
        "Update lock",
      capability:
        "locks.write",
      dangerous:
        false,
    },
  ],

  security: [
    {
      key:
        "security.audit",
      label:
        "Security audit",
      capability:
        "security.audit.read",
      dangerous:
        false,
    },
    {
      key:
        "security.control",
      label:
        "Security control",
      capability:
        "security.control",
      dangerous:
        true,
    },
    {
      key:
        "security.recovery",
      label:
        "Security recovery",
      capability:
        "recovery.execute",
      dangerous:
        true,
    },
  ],
};

export function registerCanonicalWorkspaceActions(): void {
  for (
    const [
      domain,
      actions,
    ] of Object.entries(
      matrix,
    )
  ) {
    registerWorkspaceActions(
      domain,
      actions.map(
        (action) => ({
          ...action,
          available:
            true,
          domain,
        }),
      ),
    );
  }
}
