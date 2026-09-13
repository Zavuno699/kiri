import type {
  DomainDependency,
} from "../contracts/domainDependency";

const dependencies: DomainDependency[] = [];

export function registerDomainDependency(
  dependency: DomainDependency,
): void {
  dependencies.push(
    dependency,
  );
}

export function listDomainDependencies(): DomainDependency[] {
  return [
    ...dependencies,
  ];
}

export function getDomainDependencies(
  source: string,
): DomainDependency[] {
  return listDomainDependencies().filter(
    (item) =>
      item.source === source,
  );
}
