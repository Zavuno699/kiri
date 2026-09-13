export interface LeasesProviderRegistration {
  key: "provider.leases.api";
  domain: "leases";
  initialized: boolean;
}

export const leasesProviderRegistration: LeasesProviderRegistration = {
  key: "provider.leases.api",
  domain: "leases",
  initialized: true,
};
