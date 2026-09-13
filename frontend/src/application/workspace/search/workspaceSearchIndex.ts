import type {
  WorkspaceSearchResult,
} from "../contracts/workspaceSearchResult";

let results:
  WorkspaceSearchResult[] = [];

export function setWorkspaceSearchResults(
  next: WorkspaceSearchResult[],
): void {
  results = [
    ...next,
  ];
}

export function getWorkspaceSearchResults(): WorkspaceSearchResult[] {
  return [
    ...results,
  ];
}

export function clearWorkspaceSearchResults(): void {
  results = [];
}
