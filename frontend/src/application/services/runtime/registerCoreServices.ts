import {
  registerService,
} from "../registry/serviceRegistry";

const services = [
  {
    key: "application.commandBus",
    category: "application" as const,
    required: true,
    initialized: false,
    dependencies: [],
  },
  {
    key: "application.queryBus",
    category: "application" as const,
    required: true,
    initialized: false,
    dependencies: [],
  },
  {
    key: "application.eventBus",
    category: "application" as const,
    required: true,
    initialized: false,
    dependencies: [],
  },
  {
    key: "application.security",
    category: "runtime" as const,
    required: true,
    initialized: false,
    dependencies: [
      "application.commandBus",
      "application.eventBus",
    ],
  },
  {
    key: "application.rbac",
    category: "application" as const,
    required: true,
    initialized: false,
    dependencies: [
      "application.security",
    ],
  },
  {
    key: "application.navigation",
    category: "application" as const,
    required: true,
    initialized: false,
    dependencies: [
      "application.rbac",
    ],
  },
  {
    key: "application.actions",
    category: "application" as const,
    required: true,
    initialized: false,
    dependencies: [
      "application.rbac",
    ],
  },
  {
    key: "application.health",
    category: "runtime" as const,
    required: true,
    initialized: false,
    dependencies: [
      "application.security",
    ],
  },
  {
    key: "application.workflows",
    category: "application" as const,
    required: true,
    initialized: false,
    dependencies: [
      "application.actions",
      "application.health",
    ],
  },
];

export function registerCoreServices(): void {
  for (const service of services) {
    registerService(service);
  }
}
