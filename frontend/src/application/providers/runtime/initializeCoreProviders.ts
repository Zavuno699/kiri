import {
  listProviders,
  markProviderInitialized,
} from "../registry/providerRegistry";

export function initializeCoreProviders(): void {
  for (const provider of listProviders()) {
    if (provider.required) {
      markProviderInitialized(
        provider.key,
      );
    }
  }
}
