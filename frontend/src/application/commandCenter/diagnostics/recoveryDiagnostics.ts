import {
  listRecoveries,
} from "../recovery/recoveryStore";

export function getRecoveryDiagnostics() {
  const recoveries =
    listRecoveries();

  return {
    total:
      recoveries.length,

    active:
      recoveries.filter(
        (item) =>
          item.status !==
            "completed" &&
          item.status !==
            "failed" &&
          item.status !==
            "aborted",
      ).length,

    completed:
      recoveries.filter(
        (item) =>
          item.status ===
          "completed",
      ).length,

    failed:
      recoveries.filter(
        (item) =>
          item.status ===
          "failed",
      ).length,
  };
}
