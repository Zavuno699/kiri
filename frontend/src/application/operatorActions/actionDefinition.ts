export interface OperatorActionDefinition {
  key: string;
  label: string;
  capability: string;
  domain: string;
  mutating: boolean;
  dangerous: boolean;
  privileged: boolean;
  active: boolean;
}
