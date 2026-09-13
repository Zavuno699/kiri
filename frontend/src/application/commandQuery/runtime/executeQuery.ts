import type {
  QueryRequest,
} from "../contracts/queryRequest";

import type {
  QueryResult,
} from "../contracts/queryResult";

import {
  getQuery,
} from "../registry/queryRegistry";

import {
  setQueryExecutionState,
} from "../state/queryExecutionStore";

import {
  queryRelationships,
} from "../../dataFabric/runtime/query/queryRelationships";

import {
  selectEntityDependencies,
} from "../../operationalViews/selectors/selectEntityDependencies";

export function executeQuery(
  request: QueryRequest,
): QueryResult {
  const started =
    Date.now();

  setQueryExecutionState({
    activeQueryId:
      request.queryId,
    entityId:
      request.entityId,
    status:
      "pending",
    message:
      "Executing query",
    startedAt:
      request.requestedAt,
    completedAt:
      null,
    durationMs:
      null,
  });

  const definition =
    getQuery(
      request.queryId,
    );

  if (!definition) {
    const durationMs =
      Date.now() -
      started;

    setQueryExecutionState({
      status:
        "failed",
      message:
        "Query not registered",
      completedAt:
        new Date().toISOString(),
      durationMs,
    });

    return {
      queryId:
        request.queryId,
      success:
        false,
      data:
        null,
      message:
        "Query not registered",
      durationMs,
    };
  }

  let data: unknown =
    null;

  if (
    request.queryId ===
    "entity.relationships"
  ) {
    data =
      request.entityId
        ? queryRelationships(
            request.entityId,
          )
        : [];
  } else if (
    request.queryId ===
    "entity.dependencies"
  ) {
    data =
      selectEntityDependencies(
        request.domain,
      );
  } else {
    data = {
      queryId:
        definition.id,
      domain:
        definition.domain,
      entityId:
        request.entityId,
      parameters:
        request.parameters,
    };
  }

  const durationMs =
    Date.now() -
    started;

  setQueryExecutionState({
    status:
      "completed",
    message:
      null,
    completedAt:
      new Date().toISOString(),
    durationMs,
  });

  return {
    queryId:
      request.queryId,
    success:
      true,
    data,
    message:
      null,
    durationMs,
  };
}
