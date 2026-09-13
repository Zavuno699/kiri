import {
  getServiceDiagnostics,
} from "../services/diagnostics/serviceDiagnostics";

import {
  getProviderDiagnostics,
} from "../providers/diagnostics/providerDiagnostics";

export function getServiceProviderSnapshot() {
  return {
    services:
      getServiceDiagnostics(),
    providers:
      getProviderDiagnostics(),
  };
}
