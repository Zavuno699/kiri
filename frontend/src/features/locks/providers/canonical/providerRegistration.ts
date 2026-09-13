export interface LocksProviderRegistration {
  key: "provider.locks.api";
  domain: "locks";
  initialized: boolean;
}

export const locksProviderRegistration: LocksProviderRegistration = {
  key: "provider.locks.api",
  domain: "locks",
  initialized: true,
};
