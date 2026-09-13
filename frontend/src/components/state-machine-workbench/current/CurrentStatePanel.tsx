import {
  useState,
} from "react";

import {
  getEntityState,
  initializeEntityState,
} from "../../../application/stateMachine/state/entityStateStore";

interface Props {
  domain: string;
  entityId: string;
  initialState: string;
}

export function CurrentStatePanel({
  domain,
  entityId,
  initialState,
}: Props) {
  const [
    state,
    setState,
  ] = useState(
    getEntityState(
      domain,
      entityId,
    ) ??
      initializeEntityState(
        domain,
        entityId,
        initialState,
      ),
  );

  function refresh() {
    const next =
      getEntityState(
        domain,
        entityId,
      );

    if (next) {
      setState(next);
    }
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Current entity state
      </div>

      <div className="mt-3 text-2xl font-semibold text-slate-100">
        {state.state}
      </div>

      <div className="mt-1 text-xs text-slate-500">
        {domain}
        {" · "}
        {entityId}
      </div>

      <div className="mt-2 text-[10px] text-slate-600">
        version {state.version}
        {" · "}
        {state.updatedAt}
      </div>

      <button
        type="button"
        onClick={
          refresh
        }
        className="mt-3 rounded-md border border-slate-700 px-2 py-1 text-[10px] text-slate-400 hover:border-blue-500/40"
      >
        Refresh state
      </button>
    </section>
  );
}
