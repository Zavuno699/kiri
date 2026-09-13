import {
  setWorkspaceSearchResults,
} from "./workspaceSearchIndex";

const domains = [
  "dashboard",
  "properties",
  "leases",
  "payments",
  "devices",
  "locks",
  "security",
];

export function searchWorkspaceText(
  term: string,
): void {
  const normalized =
    term
      .trim()
      .toLowerCase();

  if (!normalized) {
    setWorkspaceSearchResults([]);
    return;
  }

  setWorkspaceSearchResults(
    domains
      .filter(
        (domain) =>
          domain.includes(
            normalized,
          ),
      )
      .map(
        (domain, index) => ({
          id:
            `workspace-${domain}`,
          domain,
          label:
            domain
              .charAt(0)
              .toUpperCase() +
            domain.slice(1),
          description:
            `Operational ${domain} workspace`,
          score:
            1 - index * 0.05,
        }),
      ),
  );
}
