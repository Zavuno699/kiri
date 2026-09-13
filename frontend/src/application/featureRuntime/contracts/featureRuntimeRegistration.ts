export interface FeatureRuntimeRegistration {
  domain: string;
  required: boolean;
  initialized: boolean;
  capabilities: string[];
}
