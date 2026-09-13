export interface SecurityServiceRegistration {
  key: "feature.security.service";
  domain: "security";
  initialized: boolean;
}

export const securityServiceRegistration: SecurityServiceRegistration = {
  key: "feature.security.service",
  domain: "security",
  initialized: true,
};
