export type ServiceCategory =
  | "api"
  | "resource"
  | "application"
  | "domain"
  | "runtime"
  | "provider"
  | "repository";

export interface ServiceRegistration {
  key: string;
  category: ServiceCategory;
  domain?: string;
  required: boolean;
  initialized: boolean;
  dependencies: string[];
}
