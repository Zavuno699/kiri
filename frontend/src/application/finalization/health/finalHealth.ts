export type FinalHealthState =
  | "ready"
  | "degraded"
  | "blocked";

export type FinalHealthCheck = {
  key: string;
  state: FinalHealthState;
  detail: string;
};
