export interface WorkspaceSearchResult {
  id: string;
  domain: string;
  label: string;
  description: string | null;
  score: number;
}
