export interface WorkspaceAction {
  key: string;
  label: string;
  capability: string;
  dangerous: boolean;
  available: boolean;
  domain:
    | string
    | null;
}
