import {
  getServiceDiagnostics,
} from "../services/diagnostics/serviceDiagnostics";

import {
  getProviderDiagnostics,
} from "../providers/diagnostics/providerDiagnostics";

import {
  getDependencyDiagnostics,
} from "../dependencyGraph/diagnostics/dependencyDiagnostics";

export function getCanonicalGraphDiagnostics() {
  const services =
    getServiceDiagnostics();

  const providers =
    getProviderDiagnostics();

  const dependencies =
    getDependencyDiagnostics();

  return {
    services,
    providers,
    dependencies,
    ready:
      services.missingRequired.length === 0 &&
      providers.missingRequired.length === 0 &&
      dependencies.missingReferences.length === 0,
  };
}
