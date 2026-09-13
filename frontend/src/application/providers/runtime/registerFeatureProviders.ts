import {
  registerProvider,
} from "../registry/providerRegistry";

const domains = [
  "dashboard",
  "properties",
  "leases",
  "payments",
  "devices",
  "locks",
  "security",
];

export function registerFeatureProviders(): void {
  for (const domain of domains) {
    registerProvider({
      key: `provider.${domain}.api`,
      category: "feature",
      required: true,
      initialized: false,
      dependencies: [
        "provider.http",
        "provider.identity",
      ],
    });
  }
}
