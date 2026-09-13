export interface OperatorNavigationItem {
  key: string;
  label: string;
  path: string;
  capability?: string;
  requiresAuthentication: boolean;
  privileged: boolean;
  dangerous: boolean;
  active: boolean;
}
