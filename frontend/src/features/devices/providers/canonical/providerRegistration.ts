export interface DevicesProviderRegistration {
  key: "provider.devices.api";
  domain: "devices";
  initialized: boolean;
}

export const devicesProviderRegistration: DevicesProviderRegistration = {
  key: "provider.devices.api",
  domain: "devices",
  initialized: true,
};
