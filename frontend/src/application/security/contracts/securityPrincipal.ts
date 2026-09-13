export interface SecurityPrincipal {
  id: string;
  type:
    | "operator"
    | "service"
    | "system"
    | "unknown";
  active: boolean;
  roles: string[];
  capabilities: string[];
}
