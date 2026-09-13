import {
  listServices,
  markServiceInitialized,
} from "../registry/serviceRegistry";

export function initializeCoreServices(): void {
  for (const service of listServices()) {
    markServiceInitialized(
      service.key,
    );
  }
}
