export type ProviderCategory =
  | "http"
  | "storage"
  | "messaging"
  | "telemetry"
  | "identity"
  | "feature"
  | "runtime";

export interface ProviderRegistration {
  key: string;
  category: ProviderCategory;
  required: boolean;
  initialized: boolean;
  dependencies: string[];
}
