import {
  listProviders,
  markProviderInitialized,
} from "../registry/providerRegistry";

export function initializeFeatureProviders(): void {
  for (const provider of listProviders()) {
    if (
      provider.category === "feature" &&
      provider.required
    ) {
      markProviderInitialized(
        provider.key,
      );
    }
  }
}
