import {
  getWorkspaceContext,
} from "../../workspace/context/getWorkspaceContext";

import {
  queryEntityGraph,
} from "./queryEntityGraph";

export function buildOperationalEntityContext() {
  const workspace =
    getWorkspaceContext();

  const paths = [
    workspace.propertyId
      ? queryEntityGraph(
          "property",
          "lease",
        )
      : null,

    workspace.leaseId
      ? queryEntityGraph(
          "lease",
          "payment",
        )
      : null,

    workspace.leaseId
      ? queryEntityGraph(
          "lease",
          "device",
        )
      : null,

    workspace.leaseId
      ? queryEntityGraph(
          "lease",
          "lock",
        )
      : null,

    workspace.deviceId
      ? queryEntityGraph(
          "device",
          "lock",
        )
      : null,
  ];

  return {
    workspace,
    paths:
      paths.filter(
        Boolean,
      ),
  };
}
