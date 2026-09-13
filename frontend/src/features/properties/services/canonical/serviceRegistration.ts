export interface PropertiesServiceRegistration {
  key: "feature.properties.service";
  domain: "properties";
  initialized: boolean;
}

export const propertiesServiceRegistration: PropertiesServiceRegistration = {
  key: "feature.properties.service",
  domain: "properties",
  initialized: true,
};
