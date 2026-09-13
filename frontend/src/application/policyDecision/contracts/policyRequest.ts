import type {
  AuthorizationContext,
} from "./authorizationContext";

export interface PolicyRequest {
  action: string;
  domain: string;
  entityId: string | null;
  authorization:
    AuthorizationContext;
  state: Record<string, unknown>;
  parameters:
    Record<string, unknown>;
  confirmed: boolean;
}
