export type IntegrationSurface = {
  name: string;
  enabled: boolean;
  backendVerified: boolean;
  frontendImplemented: boolean;
};

export const integrationSurfaces: IntegrationSurface[] = [
  {
    name: "device registration",
    enabled: true,
    backendVerified: true,
    frontendImplemented: true,
  },
  {
    name: "device status",
    enabled: true,
    backendVerified: true,
    frontendImplemented: true,
  },
  {
    name: "device command",
    enabled: true,
    backendVerified: true,
    frontendImplemented: true,
  },
  {
    name: "lease and lock workflows",
    enabled: true,
    backendVerified: true,
    frontendImplemented: true,
  },
  {
    name: "security and recovery surfaces",
    enabled: true,
    backendVerified: false,
    frontendImplemented: true,
  },
];
