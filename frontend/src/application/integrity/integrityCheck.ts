export type IntegrityStatus =
  | "pass"
  | "warn"
  | "fail"
  | "unknown";

export interface IntegrityCheck {
  key: string;
  domain: string;
  status: IntegrityStatus;
  reason: string;
  checkedAt: string;
}
