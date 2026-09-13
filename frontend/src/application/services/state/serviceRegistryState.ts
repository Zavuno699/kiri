import type {
  ServiceRegistration,
} from "../contracts/serviceRegistration";

export interface ServiceRegistryState {
  initialized: boolean;
  services: ServiceRegistration[];
  missingRequired: string[];
}
