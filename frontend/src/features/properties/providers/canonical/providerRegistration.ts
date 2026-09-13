export interface PropertiesProviderRegistration {
  key: "provider.properties.api";
  domain: "properties";
  initialized: boolean;
}

export const propertiesProviderRegistration: PropertiesProviderRegistration = {
  key: "provider.properties.api",
  domain: "properties",
  initialized: true,
};
