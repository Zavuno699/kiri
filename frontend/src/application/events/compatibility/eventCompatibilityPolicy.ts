export type EventCompatibilityPolicy = {
  allowBackwardMinor: boolean;
  allowForwardMinor: boolean;
  allowMajorMigration: boolean;
  rejectUnknownEventTypes: boolean;
};

export const defaultEventCompatibilityPolicy: EventCompatibilityPolicy = {
  allowBackwardMinor: true,
  allowForwardMinor: false,
  allowMajorMigration: false,
  rejectUnknownEventTypes: true,
};
