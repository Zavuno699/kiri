import {
  registerFeatureServiceDescriptor,
} from "../registry/featureServiceRegistry";

const domains = [
  "dashboard",
  "properties",
  "leases",
  "payments",
  "devices",
  "locks",
  "security",
];

export function registerFeatureServiceDescriptors(): void {
  for (const domain of domains) {
    registerFeatureServiceDescriptor({
      key: `feature.${domain}.canonicalService`,
      domain,
      resourceKey: domain,
      required: true,
      initialized: true,
    });
  }
}
