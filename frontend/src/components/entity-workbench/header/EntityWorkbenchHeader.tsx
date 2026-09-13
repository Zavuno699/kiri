import {
  useEffect,
  useState,
} from "react";

import {
  getEntityWorkbenchState,
  subscribeEntityWorkbench,
} from "../../../application/operationalViews/workbench/entityWorkbenchStore";

import {
  selectOperationalEntity,
} from "../../../application/operationalViews/selectors/selectOperationalEntity";

export function EntityWorkbenchHeader() {
  const [
    state,
    setState,
  ] = useState(
    getEntityWorkbenchState(),
  );

  useEffect(
    () =>
      subscribeEntityWorkbench(
        () =>
          setState(
            getEntityWorkbenchState(),
          ),
      ),
    [],
  );

  const entity =
    state.selectedEntityId
      ? selectOperationalEntity(
          state.selectedEntityId,
        )
      : null;

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-blue-300/70">
        Cross-domain workbench
      </div>

      <div className="mt-2 text-xl font-semibold text-slate-100">
        {entity?.title ??
          "No entity selected"}
      </div>

      <div className="mt-1 text-sm text-slate-500">
        {entity?.subtitle ??
          "Select an operational entity"}
      </div>

      {state.error ? (
        <div className="mt-3 text-xs text-red-400">
          {state.error}
        </div>
      ) : null}
    </section>
  );
}
