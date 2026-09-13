export interface LocksServiceRegistration {
  key: "feature.locks.service";
  domain: "locks";
  initialized: boolean;
}

export const locksServiceRegistration: LocksServiceRegistration = {
  key: "feature.locks.service",
  domain: "locks",
  initialized: true,
};
