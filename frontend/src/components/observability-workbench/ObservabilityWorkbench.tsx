import {
  ObservabilityWorkbenchHeader,
} from "./header/ObservabilityWorkbenchHeader";

import {
  AuditTimeline,
} from "./audit/AuditTimeline";

import {
  TraceSpanList,
} from "./trace/TraceSpanList";

import {
  TelemetryPanel,
} from "./telemetry/TelemetryPanel";

import {
  HealthSignalPanel,
} from "./health/HealthSignalPanel";

import {
  AnomalyPanel,
} from "./anomalies/AnomalyPanel";

import {
  ObservabilityStatus,
} from "./status/ObservabilityStatus";

interface Props {
  domain?: string;
  traceId?: string;
}

export function ObservabilityWorkbench({
  domain,
  traceId,
}: Props) {
  return (
    <section className="space-y-4">
      <ObservabilityWorkbenchHeader />

      <div className="grid gap-4 lg:grid-cols-2">
        <AuditTimeline
          domain={
            domain
          }
        />

        <TraceSpanList
          traceId={
            traceId
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TelemetryPanel
          domain={
            domain
          }
        />

        <HealthSignalPanel
          domain={
            domain
          }
        />
      </div>

      <AnomalyPanel
        domain={
          domain
        }
      />

      <ObservabilityStatus />
    </section>
  );
}
