export interface LeasesServiceRegistration {
  key: "feature.leases.service";
  domain: "leases";
  initialized: boolean;
}

export const leasesServiceRegistration: LeasesServiceRegistration = {
  key: "feature.leases.service",
  domain: "leases",
  initialized: true,
};
