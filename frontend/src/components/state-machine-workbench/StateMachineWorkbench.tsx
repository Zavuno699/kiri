import {
  StateMachineWorkbenchHeader,
} from "./header/StateMachineWorkbenchHeader";

import {
  CurrentStatePanel,
} from "./current/CurrentStatePanel";

import {
  TransitionList,
} from "./transitions/TransitionList";

import {
  StateGuardPanel,
} from "./guards/StateGuardPanel";

import {
  InvariantPanel,
} from "./invariants/InvariantPanel";

import {
  TransitionHistory,
} from "./history/TransitionHistory";

import {
  StateMachineStatus,
} from "./status/StateMachineStatus";

interface Props {
  domain?: string;
  entityId?: string;
  initialState?: string;
}

const initialStates: Record<
  string,
  string
> = {
  dashboard:
    "dashboard.ready",
  properties:
    "property.active",
  leases:
    "lease.active",
  payments:
    "payment.pending",
  devices:
    "device.online",
  locks:
    "lock.secured",
  security:
    "security.clear",
};

export function StateMachineWorkbench({
  domain =
    "locks",
  entityId =
    "lock-workbench",
  initialState,
}: Props) {
  const state =
    initialState ??
    initialStates[
      domain
    ] ??
    "dashboard.ready";

  return (
    <section className="space-y-4">
      <StateMachineWorkbenchHeader />

      <div className="grid gap-4 lg:grid-cols-2">
        <CurrentStatePanel
          domain={
            domain
          }
          entityId={
            entityId
          }
          initialState={
            state
          }
        />

        <TransitionList
          domain={
            domain
          }
          entityId={
            entityId
          }
          currentState={
            state
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <StateGuardPanel
          domain={
            domain
          }
        />

        <InvariantPanel
          domain={
            domain
          }
        />
      </div>

      <TransitionHistory
        domain={
          domain
        }
        entityId={
          entityId
        }
      />

      <StateMachineStatus />
    </section>
  );
}
