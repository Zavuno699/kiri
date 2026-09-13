export interface RuntimeRegistration {
  key: string;
  required: boolean;
  initialized: boolean;
  category:
    | "application"
    | "security"
    | "navigation"
    | "data"
    | "workflow"
    | "observability";
}

const registrations = new Map<
  string,
  RuntimeRegistration
>();

export function registerCanonicalRuntime(
  registration: RuntimeRegistration,
): void {
  registrations.set(
    registration.key,
    registration,
  );
}

export function markCanonicalRuntimeInitialized(
  key: string,
): void {
  const current = registrations.get(key);

  if (!current) {
    return;
  }

  registrations.set(key, {
    ...current,
    initialized: true,
  });
}

export function listCanonicalRuntimes(): RuntimeRegistration[] {
  return [...registrations.values()];
}
