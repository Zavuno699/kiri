export interface CommandCenterMetric {
  key: string;
  label: string;
  value: string | number;
  severity:
    | "info"
    | "warning"
    | "critical"
    | "normal";
}
