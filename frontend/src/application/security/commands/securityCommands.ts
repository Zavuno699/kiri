
export interface FreezeSecurityOperationsCommand {
  type: "security.freeze";
  reason: string;
}

export interface UnfreezeSecurityOperationsCommand {
  type: "security.unfreeze";
  reason: string;
}

