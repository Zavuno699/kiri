import {
  flowQuery,
} from "../../queries/flowQuery";

import {
  flowProjection,
} from "../../state/flowProjection";

export async function executeDashboardRefreshFlow(): Promise<unknown> {
  const result =
    await flowQuery(
      "dashboard",
      "dashboard",
      {
        type:
          "dashboard.refresh",
      },
    );

  flowProjection(
    "dashboard",
    "dashboard",
    result,
  );

  return result;
}
