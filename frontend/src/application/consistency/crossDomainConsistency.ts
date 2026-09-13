export type CrossDomainConsistency =
  | "consistent"
  | "mixed"
  | "stale"
  | "unknown";

export type CrossDomainConsistencyInput = {
  versions: Record<string, number>;
  requiredDomains: string[];
};

export function evaluateCrossDomainConsistency(
  input: CrossDomainConsistencyInput,
): CrossDomainConsistency {
  if (input.requiredDomains.length === 0) {
    return "unknown";
  }

  const present = input.requiredDomains.filter(
    (domain) => input.versions[domain] !== undefined,
  );

  if (present.length === 0) {
    return "unknown";
  }

  if (present.length !== input.requiredDomains.length) {
    return "mixed";
  }

  const values = present.map((domain) => input.versions[domain]);
  return new Set(values).size <= 1 ? "consistent" : "mixed";
}
