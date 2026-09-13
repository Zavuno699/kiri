import type {
  DomainFlowDefinition,
} from "../contracts/domainFlowDefinition";

const definitions = new Map<
  string,
  DomainFlowDefinition
>();

export function registerDomainFlowDefinition(
  definition: DomainFlowDefinition,
): void {
  definitions.set(
    definition.key,
    definition,
  );
}

export function getDomainFlowDefinition(
  key: string,
): DomainFlowDefinition | null {
  return (
    definitions.get(key) ??
    null
  );
}

export function listDomainFlowDefinitions(): DomainFlowDefinition[] {
  return [
    ...definitions.values(),
  ];
}
