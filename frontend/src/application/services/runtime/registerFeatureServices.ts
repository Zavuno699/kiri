import {
  registerService,
} from "../registry/serviceRegistry";

const domains = [
  "dashboard",
  "properties",
  "leases",
  "payments",
  "devices",
  "locks",
  "security",
];

export function registerFeatureServices(): void {
  for (const domain of domains) {
    registerService({
      key: `feature.${domain}.service`,
      category: "domain",
      domain,
      required: true,
      initialized: false,
      dependencies: [
        "provider.http",
        "application.security",
        "application.rbac",
      ],
    });

    registerService({
      key: `feature.${domain}.queries`,
      category: "application",
      domain,
      required: true,
      initialized: false,
      dependencies: [
        `feature.${domain}.service`,
      ],
    });

    registerService({
      key: `feature.${domain}.commands`,
      category: "application",
      domain,
      required: true,
      initialized: false,
      dependencies: [
        `feature.${domain}.service`,
        "application.actions",
      ],
    });
  }
}
