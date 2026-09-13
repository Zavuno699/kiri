import {
  recordHealthSignal,
} from "../health/healthStore";

export function checkComponentHealth(input: {
  component: string;
  domain: string;
  status:
    | "healthy"
    | "degraded"
    | "critical"
    | "unknown";
  message: string;
  latencyMs?: number | null;
}): string {
  const id =
    `health-${input.domain}-${input.component}`;

  recordHealthSignal({
    id,
    component:
      input.component,
    domain:
      input.domain,
    status:
      input.status,
    message:
      input.message,
    checkedAt:
      new Date().toISOString(),
    latencyMs:
      input.latencyMs ??
      null,
  });

  return id;
}
