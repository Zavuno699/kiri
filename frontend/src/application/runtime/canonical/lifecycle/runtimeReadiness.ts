import {
  listCanonicalRuntimes,
} from "../registry/runtimeRegistration";

export interface CanonicalRuntimeReadiness {
  ready: boolean;
  required: number;
  initialized: number;
  missing: string[];
}

export function evaluateCanonicalRuntimeReadiness(): CanonicalRuntimeReadiness {
  const registrations =
    listCanonicalRuntimes();

  const required =
    registrations.filter(
      (item) => item.required,
    );

  const initialized =
    required.filter(
      (item) => item.initialized,
    );

  return {
    ready:
      required.length > 0 &&
      initialized.length === required.length,
    required: required.length,
    initialized: initialized.length,
    missing: required
      .filter(
        (item) => !item.initialized,
      )
      .map(
        (item) => item.key,
      ),
  };
}
