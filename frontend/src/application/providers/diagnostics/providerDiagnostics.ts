import {
  listProviders,
} from "../registry/providerRegistry";

export function getProviderDiagnostics() {
  const providers =
    listProviders();

  const required =
    providers.filter(
      (provider) => provider.required,
    );

  return {
    total:
      providers.length,
    required:
      required.length,
    initialized:
      providers.filter(
        (provider) => provider.initialized,
      ).length,
    missingRequired:
      required
        .filter(
          (provider) => !provider.initialized,
        )
        .map(
          (provider) => provider.key,
        ),
  };
}
