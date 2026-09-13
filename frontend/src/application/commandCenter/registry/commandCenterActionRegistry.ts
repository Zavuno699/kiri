import type {
  CommandCenterAction,
} from "../contracts/commandCenterAction";

const actions: CommandCenterAction[] = [];

export function registerCommandCenterAction(
  action: CommandCenterAction,
): void {
  actions.push(
    action,
  );
}

export function listCommandCenterActions(): CommandCenterAction[] {
  return [
    ...actions,
  ];
}
