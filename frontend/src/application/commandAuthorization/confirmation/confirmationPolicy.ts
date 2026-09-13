export interface CommandConfirmationPolicy {
  requiredForDangerous: boolean;
  requiredForPrivileged: boolean;
  allowKeyboardBypass: boolean;
}

export const defaultCommandConfirmationPolicy: CommandConfirmationPolicy = {
  requiredForDangerous: true,
  requiredForPrivileged: true,
  allowKeyboardBypass: false,
};
