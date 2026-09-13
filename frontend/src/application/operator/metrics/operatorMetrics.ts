import {
  listOperatorHistory,
} from "../history/operatorHistory"

export function getOperatorMetrics() {
  const history = listOperatorHistory()

  return {
    totalActions: history.length,
    successfulActions:
      history.filter(
        (entry) => entry.success,
      ).length,
    failedActions:
      history.filter(
        (entry) => !entry.success,
      ).length,
  }
}
