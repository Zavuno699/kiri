export interface SecurityProviderRegistration {
  key: "provider.security.api";
  domain: "security";
  initialized: boolean;
}

export const securityProviderRegistration: SecurityProviderRegistration = {
  key: "provider.security.api",
  domain: "security",
  initialized: true,
};
