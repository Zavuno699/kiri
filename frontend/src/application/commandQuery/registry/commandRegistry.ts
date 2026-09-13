import type {
  CommandDefinition,
} from "../contracts/commandDefinition";

const commands = new Map<
  string,
  CommandDefinition
>();

export function registerCommand(
  command: CommandDefinition,
): void {
  commands.set(
    command.id,
    command,
  );
}

export function getCommand(
  commandId: string,
): CommandDefinition | null {
  return (
    commands.get(commandId) ??
    null
  );
}

export function listCommands(): CommandDefinition[] {
  return [
    ...commands.values(),
  ];
}

export function listCommandsByDomain(
  domain: string,
): CommandDefinition[] {
  return listCommands().filter(
    (command) =>
      command.domain ===
      domain,
  );
}
