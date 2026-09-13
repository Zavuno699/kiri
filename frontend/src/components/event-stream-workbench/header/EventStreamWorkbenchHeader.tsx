import {
  useEffect,
  useState,
} from "react";

import {
  getEventStreamDiagnostics,
} from "../../../application/eventStream/diagnostics/eventStreamDiagnostics";

import {
  subscribeEventStream,
} from "../../../application/eventStream/state/eventStreamStateStore";

export function EventStreamWorkbenchHeader() {
  const [
    diagnostics,
    setDiagnostics,
  ] = useState(
    getEventStreamDiagnostics(),
  );

  useEffect(
    () =>
      subscribeEventStream(
        () =>
          setDiagnostics(
            getEventStreamDiagnostics(),
          ),
      ),
    [],
  );

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-blue-300/70">
        Global event fabric
      </div>

      <div className="mt-2 text-xl font-semibold text-slate-100">
        Event Stream Workbench
      </div>

      <div className="mt-1 text-sm text-slate-500">
        Command, event, projection, correlation, and causation traceability.
      </div>

      <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          Event types:{" "}
          {diagnostics.eventDefinitionCount}
        </div>

        <div>
          Projections:{" "}
          {diagnostics.projectionCount}
        </div>

        <div>
          Command links:{" "}
          {diagnostics.commandEventLinkCount}
        </div>

        <div>
          Projection links:{" "}
          {diagnostics.eventProjectionLinkCount}
        </div>

        <div>
          Stream records:{" "}
          {diagnostics.streamRecordCount}
        </div>
      </div>
    </section>
  );
}
