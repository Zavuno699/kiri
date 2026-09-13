import type {
  ApplicationFlow,
} from "../contracts/applicationFlow";

const flows = new Map<
  string,
  ApplicationFlow
>();

export function registerFlow(
  flow: ApplicationFlow,
): void {
  flows.set(
    flow.key,
    flow,
  );
}

export function getFlow(
  key: string,
): ApplicationFlow | null {
  return (
    flows.get(key) ??
    null
  );
}

export function listFlows(): ApplicationFlow[] {
  return [
    ...flows.values(),
  ];
}
