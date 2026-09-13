export interface DomainRuntimeDescriptor {
  domain: string;
  enabled: boolean;
  initialized: boolean;
  ready: boolean;
  dependencies: string[];
  capabilities: string[];
}
