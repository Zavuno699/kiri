import {
  initializeCanonicalApi,
} from "./initializeCanonicalApi";

import {
  listApiResources,
} from "../registry/resourceRegistry";

import {
  listApiOperations,
} from "../registry/operationRegistry";

import {
  setApiRuntimeState,
} from "../state/apiRuntimeStore";

export function startApiRuntime(): void {
  initializeCanonicalApi();

  setApiRuntimeState({
    initialized: true,
    resourceCount:
      listApiResources().length,
    operationCount:
      listApiOperations().length,
    lastInitializedAt:
      new Date().toISOString(),
  });
}
