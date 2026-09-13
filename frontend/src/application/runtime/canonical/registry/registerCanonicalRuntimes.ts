import {
  registerCanonicalRuntime,
} from "./runtimeRegistration";

const runtimes = [
  {
    key: "security",
    required: true,
    initialized: false,
    category: "security" as const,
  },
  {
    key: "rbac",
    required: true,
    initialized: false,
    category: "security" as const,
  },
  {
    key: "navigation",
    required: true,
    initialized: false,
    category: "navigation" as const,
  },
  {
    key: "actions",
    required: true,
    initialized: false,
    category: "application" as const,
  },
  {
    key: "dataflow",
    required: true,
    initialized: false,
    category: "data" as const,
  },
  {
    key: "workflows",
    required: true,
    initialized: false,
    category: "workflow" as const,
  },
  {
    key: "audit",
    required: true,
    initialized: false,
    category: "observability" as const,
  },
  {
    key: "health",
    required: true,
    initialized: false,
    category: "observability" as const,
  },
];

export function registerAllCanonicalRuntimes(): void {
  for (const runtime of runtimes) {
    registerCanonicalRuntime(runtime);
  }
}
