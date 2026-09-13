export interface DomainFlowDefinition {
  key: string;
  domain: string;
  readCapability: string;
  writeCapability?: string;
  commandCapability?: string;
  steps: string[];
}
