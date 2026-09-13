export interface DecisionTrace {
  decisionId: string;
  authorization:
    | "pass"
    | "fail"
    | "unknown";
  policy:
    | "pass"
    | "fail"
    | "unknown";
  risk:
    | "pass"
    | "fail"
    | "unknown";
  guards:
    | "pass"
    | "fail"
    | "unknown";
  final:
    | "allow"
    | "deny"
    | "conditional"
    | "blocked";
  reasons: string[];
}
