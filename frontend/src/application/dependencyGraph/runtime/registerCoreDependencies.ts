import {
  registerDependency,
} from "../registry/dependencyRegistry";

const dependencies = [
  {
    key: "runtime.canonical",
    category: "runtime" as const,
    required: true,
    dependencies: [],
  },
  {
    key: "security.runtime",
    category: "runtime" as const,
    required: true,
    dependencies: [
      "runtime.canonical",
    ],
  },
  {
    key: "rbac.runtime",
    category: "service" as const,
    required: true,
    dependencies: [
      "security.runtime",
    ],
  },
  {
    key: "navigation.runtime",
    category: "service" as const,
    required: true,
    dependencies: [
      "rbac.runtime",
    ],
  },
  {
    key: "action.runtime",
    category: "service" as const,
    required: true,
    dependencies: [
      "rbac.runtime",
      "navigation.runtime",
    ],
  },
  {
    key: "health.runtime",
    category: "service" as const,
    required: true,
    dependencies: [
      "security.runtime",
      "rbac.runtime",
    ],
  },
  {
    key: "workflow.runtime",
    category: "service" as const,
    required: true,
    dependencies: [
      "health.runtime",
      "action.runtime",
    ],
  },
  {
    key: "audit.runtime",
    category: "service" as const,
    required: true,
    dependencies: [
      "security.runtime",
      "action.runtime",
    ],
  },
];

export function registerCoreDependencies(): void {
  for (const dependency of dependencies) {
    registerDependency(dependency);
  }
}
