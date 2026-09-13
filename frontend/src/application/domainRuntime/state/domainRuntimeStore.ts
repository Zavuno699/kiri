import type {
  DomainRuntimeState,
} from "../contracts/domainRuntimeState";

const states = new Map<
  string,
  DomainRuntimeState
>();

export function registerDomainRuntime(
  state: DomainRuntimeState,
): void {
  states.set(
    state.domain,
    state,
  );
}

export function getDomainRuntime(
  domain: string,
): DomainRuntimeState | null {
  return (
    states.get(domain) ??
    null
  );
}

export function updateDomainRuntime(
  domain: string,
  patch: Partial<DomainRuntimeState>,
): void {
  const current =
    states.get(domain);

  if (!current) {
    return;
  }

  states.set(
    domain,
    {
      ...current,
      ...patch,
    },
  );
}

export function listDomainRuntimes(): DomainRuntimeState[] {
  return [
    ...states.values(),
  ];
}
