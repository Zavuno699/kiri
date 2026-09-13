import {
  registerRuntimeSubsystem,
} from "./unifiedRuntimeRegistry";

const SUBSYSTEMS = [
  {
    key: "security",
    category: "security" as const,
    required: true,
    active: true,
  },
  {
    key: "rbac",
    category: "security" as const,
    required: true,
    active: true,
  },
  {
    key: "navigation",
    category: "navigation" as const,
    required: true,
    active: true,
  },
  {
    key: "operator-actions",
    category: "actions" as const,
    required: true,
    active: true,
  },
  {
    key: "consistency",
    category: "health" as const,
    required: true,
    active: true,
  },
  {
    key: "domain-health",
    category: "health" as const,
    required: true,
    active: true,
  },
  {
    key: "workflow-orchestration",
    category: "orchestration" as const,
    required: true,
    active: true,
  },
  {
    key: "audit",
    category: "data" as const,
    required: true,
    active: true,
  },
  {
    key: "frontend-health",
    category: "ui" as const,
    required: false,
    active: true,
  },
];

export function registerUnifiedRuntimeSubsystems(): void {
  for (const subsystem of SUBSYSTEMS) {
    registerRuntimeSubsystem(subsystem);
  }
}
