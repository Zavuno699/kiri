import type {
  CommandDefinition,
} from "./commandDefinition";

export interface ActionDescriptor {
  id: string;
  command: CommandDefinition;
  entityId: string | null;
  visible: boolean;
  enabled: boolean;
  blockedReason: string | null;
}
