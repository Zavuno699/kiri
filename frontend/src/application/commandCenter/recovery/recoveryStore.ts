import type {
  RecoveryOperation,
} from "../contracts/recovery";

const recoveries = new Map<
  string,
  RecoveryOperation
>();

export function registerRecovery(
  recovery: RecoveryOperation,
): void {
  recoveries.set(
    recovery.id,
    recovery,
  );
}

export function getRecovery(
  id: string,
): RecoveryOperation | null {
  return (
    recoveries.get(id) ??
    null
  );
}

export function updateRecovery(
  id: string,
  patch: Partial<RecoveryOperation>,
): void {
  const current =
    recoveries.get(id);

  if (!current) {
    return;
  }

  recoveries.set(
    id,
    {
      ...current,
      ...patch,
    },
  );
}

export function listRecoveries(): RecoveryOperation[] {
  return [
    ...recoveries.values(),
  ];
}
