export type DomainInvalidationRule = {
  domain: string;
  projection: string;
  invalidatesOn: string[];
};

export const domainInvalidationRules:
  DomainInvalidationRule[] = [
    {
      domain: "properties",
      projection: "property",
      invalidatesOn: [
        "property.created",
        "property.updated",
        "lease.changed",
        "device.changed",
      ],
    },
    {
      domain: "leases",
      projection: "lease",
      invalidatesOn: [
        "lease.created",
        "lease.updated",
        "payment.settled",
      ],
    },
    {
      domain: "payments",
      projection: "payment",
      invalidatesOn: [
        "payment.created",
        "payment.updated",
        "payment.settled",
      ],
    },
    {
      domain: "devices",
      projection: "device",
      invalidatesOn: [
        "device.registered",
        "device.status.changed",
        "device.heartbeat",
      ],
    },
    {
      domain: "locks",
      projection: "lock",
      invalidatesOn: [
        "lock.commanded",
        "lock.state.changed",
        "security.freeze",
      ],
    },
    {
      domain: "security",
      projection: "security",
      invalidatesOn: [
        "security.incident",
        "security.freeze",
        "credential.revoked",
      ],
    },
  ];
