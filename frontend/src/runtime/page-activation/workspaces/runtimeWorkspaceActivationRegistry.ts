export const runtimeWorkspaceActivationRegistry =
  new Map([
    [
      "dashboard.workspace",
      {
        domain: "dashboard",
        enabled: true,
      },
    ],
    [
      "property.workspace",
      {
        domain: "property",
        enabled: true,
      },
    ],
    [
      "lease.workspace",
      {
        domain: "lease",
        enabled: true,
      },
    ],
    [
      "payment.workspace",
      {
        domain: "payment",
        enabled: true,
      },
    ],
    [
      "device.workspace",
      {
        domain: "device",
        enabled: true,
      },
    ],
    [
      "lock.workspace",
      {
        domain: "lock",
        enabled: false,
      },
    ],
    [
      "security.workspace",
      {
        domain: "security",
        enabled: false,
      },
    ],
  ])
