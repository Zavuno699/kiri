export interface TransitionDefinition {
  id: string;
  domain: string;
  name: string;
  label: string;
  description: string;
  fromStates: string[];
  toState: string;
  action: string;
  guarded: boolean;
  reversible: boolean;
  enabled: boolean;
}
