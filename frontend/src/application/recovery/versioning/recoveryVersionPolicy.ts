export type RecoveryVersionPolicy = {
  allowMigration: boolean;
  allowRebuild: boolean;
  rejectUnsupported: boolean;
};

export const defaultRecoveryVersionPolicy: RecoveryVersionPolicy = {
  allowMigration: true,
  allowRebuild: true,
  rejectUnsupported: true,
};
