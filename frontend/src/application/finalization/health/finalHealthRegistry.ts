import type { FinalHealthCheck } from "./finalHealth";

export const finalHealthRegistry: FinalHealthCheck[] = [
  {
    key: "routing",
    state: "ready",
    detail: "Route metadata present",
  },
  {
    key: "domain-surfaces",
    state: "ready",
    detail: "Core domain surfaces registered",
  },
  {
    key: "projection-fabric",
    state: "ready",
    detail: "Projection and replay layers present",
  },
  {
    key: "security",
    state: "ready",
    detail: "Security surfaces registered",
  },
  {
    key: "integration",
    state: "ready",
    detail: "Integration manifest present",
  },
  {
    key: "build",
    state: "blocked",
    detail: "Final build verification pending",
  },
];
