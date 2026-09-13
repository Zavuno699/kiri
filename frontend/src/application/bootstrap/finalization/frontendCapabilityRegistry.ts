export type FrontendCapability =
  | "routing"
  | "api"
  | "commands"
  | "queries"
  | "events"
  | "projections"
  | "realtime"
  | "security"
  | "audit"
  | "workspaces"
  | "observability"
  | "recovery";

export const frontendCapabilities: Record<
  FrontendCapability,
  boolean
> = {
  routing: true,
  api: true,
  commands: true,
  queries: true,
  events: true,
  projections: true,
  realtime: true,
  security: true,
  audit: true,
  workspaces: true,
  observability: true,
  recovery: true,
};
