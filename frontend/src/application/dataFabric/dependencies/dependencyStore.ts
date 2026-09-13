import type {
  DataDependency,
} from "../contracts/dataDependency";

const dependencies = new Map<
  string,
  DataDependency
>();

export function registerDataDependency(
  dependency: DataDependency,
): void {
  dependencies.set(
    dependency.id,
    dependency,
  );
}

export function listDataDependencies(): DataDependency[] {
  return [
    ...dependencies.values(),
  ];
}

export function getDependenciesForDomain(
  domain: string,
): DataDependency[] {
  return listDataDependencies().filter(
    (dependency) =>
      dependency.sourceDomain ===
        domain ||
      dependency.targetDomain ===
        domain,
  );
}
