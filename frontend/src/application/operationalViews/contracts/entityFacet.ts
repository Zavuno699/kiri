export interface EntityFacet {
  key: string;
  label: string;
  value: string;
  severity:
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "danger";
}
