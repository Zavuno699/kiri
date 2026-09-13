import {
  registerProvider,
} from "../registry/providerRegistry";

const providers = [
  {
    key: "provider.http",
    category: "http" as const,
    required: true,
    initialized: false,
    dependencies: [],
  },
  {
    key: "provider.storage",
    category: "storage" as const,
    required: true,
    initialized: false,
    dependencies: [],
  },
  {
    key: "provider.identity",
    category: "identity" as const,
    required: true,
    initialized: false,
    dependencies: [],
  },
  {
    key: "provider.telemetry",
    category: "telemetry" as const,
    required: false,
    initialized: false,
    dependencies: [],
  },
  {
    key: "provider.runtime",
    category: "runtime" as const,
    required: true,
    initialized: false,
    dependencies: [
      "provider.http",
      "provider.storage",
      "provider.identity",
    ],
  },
];

export function registerCoreProviders(): void {
  for (const provider of providers) {
    registerProvider(provider);
  }
}
