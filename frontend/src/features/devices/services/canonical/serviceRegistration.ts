export interface DevicesServiceRegistration {
  key: "feature.devices.service";
  domain: "devices";
  initialized: boolean;
}

export const devicesServiceRegistration: DevicesServiceRegistration = {
  key: "feature.devices.service",
  domain: "devices",
  initialized: true,
};
