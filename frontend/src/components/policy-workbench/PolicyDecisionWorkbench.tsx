import {
  PolicyWorkbenchHeader,
} from "./header/PolicyWorkbenchHeader";

import {
  AuthorizationPanel,
} from "./authorization/AuthorizationPanel";

import {
  RiskPanel,
} from "./risk/RiskPanel";

import {
  GuardPanel,
} from "./guards/GuardPanel";

import {
  DecisionPanel,
} from "./decision/DecisionPanel";

import {
  PolicyStatus,
} from "./status/PolicyStatus";

interface Props {
  domain?: string;
  action?: string;
  entityId?: string | null;
}

export function PolicyDecisionWorkbench({
  domain =
    "locks",
  action =
    "lock.secure",
  entityId =
    null,
}: Props) {
  return (
    <section className="space-y-4">
      <PolicyWorkbenchHeader />

      <div className="grid gap-4 lg:grid-cols-2">
        <AuthorizationPanel
          domain={
            domain
          }
          action={
            action
          }
        />

        <RiskPanel
          domain={
            domain
          }
          action={
            action
          }
        />
      </div>

      <GuardPanel
        domain={
          domain
        }
      />

      <DecisionPanel
        domain={
          domain
        }
        action={
          action
        }
        entityId={
          entityId
        }
      />

      <PolicyStatus />
    </section>
  );
}
