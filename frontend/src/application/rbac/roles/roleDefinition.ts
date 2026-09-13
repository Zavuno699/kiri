import type { RoleKey } from "../types";

export interface RoleDefinition {
  key: RoleKey;
  name: string;
  description: string;
  priority: number;
  capabilities: string[];
  active: boolean;
}
