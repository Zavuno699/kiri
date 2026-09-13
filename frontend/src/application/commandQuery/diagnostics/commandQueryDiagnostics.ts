import {
  listCommands,
} from "../registry/commandRegistry";

import {
  listQueries,
} from "../registry/queryRegistry";

import {
  getCommandExecutionState,
} from "../state/commandExecutionStore";

import {
  getQueryExecutionState,
} from "../state/queryExecutionStore";

import {
  listCommandHistory,
} from "../events/commandHistoryStore";

export function getCommandQueryDiagnostics() {
  return {
    commandCount:
      listCommands().length,
    queryCount:
      listQueries().length,
    commandExecution:
      getCommandExecutionState(),
    queryExecution:
      getQueryExecutionState(),
    historyCount:
      listCommandHistory().length,
  };
}
