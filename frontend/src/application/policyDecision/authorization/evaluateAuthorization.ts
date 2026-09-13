import type {
  AuthorizationContext,
} from "../contracts/authorizationContext";

export interface AuthorizationEvaluation {
  status:
    | "pass"
    | "fail"
    | "unknown";
  reasons: string[];
}

export function evaluateAuthorization(
  context: AuthorizationContext,
  domain: string,
  action: string,
): AuthorizationEvaluation {
  const reasons: string[] = [];

  if (
    !context.authenticated
  ) {
    return {
      status:
        "fail",
      reasons: [
        "Authentication required",
      ],
    };
  }

  if (
    !context.domains.includes(
      domain,
    ) &&
    !context.domains.includes(
      "global",
    )
  ) {
    return {
      status:
        "fail",
      reasons: [
        `Domain access denied for ${domain}`,
      ],
    };
  }

  if (
    action !==
      "" &&
    !context.capabilities.includes(
      action,
    )
  ) {
    reasons.push(
      `Capability not explicitly granted for ${action}`,
    );

    return {
      status:
        "fail",
      reasons,
    };
  }

  return {
    status:
      "pass",
    reasons:
      [],
  };
}
