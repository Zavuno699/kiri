export const liveEventTypes = {
  resourceUpdated: "resource.updated",
  resourceInvalidated: "resource.invalidated",
  resourceRefreshed: "resource.refreshed",
  commandAccepted: "command.accepted",
  commandCompleted: "command.completed",
  commandFailed: "command.failed",
  commandBlocked: "command.blocked",
  entityStatusChanged: "entity.status.changed",
  timelineAppended: "timeline.appended",
  notificationCreated: "notification.created",
} as const
