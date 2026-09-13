import {
  useEffect,
  useState,
} from "react";

import {
  EventStreamWorkbenchHeader,
} from "./header/EventStreamWorkbenchHeader";

import {
  EventDefinitionList,
} from "./events/EventDefinitionList";

import {
  EventTimeline,
} from "./timeline/EventTimeline";

import {
  CommandEventTracePanel,
} from "./trace/CommandEventTracePanel";

import {
  EventProjectionTracePanel,
} from "./projections/EventProjectionTracePanel";

import {
  EventReplayPanel,
} from "./replay/EventReplayPanel";

import {
  EventStreamStatus,
} from "./status/EventStreamStatus";

import {
  getEventStreamState,
  subscribeEventStream,
} from "../../application/eventStream/state/eventStreamStateStore";

interface Props {
  domain?: string;
}

export function EventStreamWorkbench({
  domain,
}: Props) {
  const [
    state,
    setState,
  ] = useState(
    getEventStreamState(),
  );

  useEffect(
    () =>
      subscribeEventStream(
        () =>
          setState(
            getEventStreamState(),
          ),
      ),
    [],
  );

  const selectedEventType =
    state.selectedEventType ??
    "lock.secured";

  const selectedCommand =
    selectedEventType ===
      "lock.secured"
      ? "lock.secure"
      : selectedEventType ===
          "lock.released"
        ? "lock.release"
        : selectedEventType ===
            "security.frozen"
          ? "security.freeze"
          : selectedEventType ===
              "security.recovered"
            ? "security.unfreeze"
            : "property.refresh";

  return (
    <section className="space-y-4">
      <EventStreamWorkbenchHeader />

      <div className="grid gap-4 lg:grid-cols-2">
        <EventDefinitionList
          domain={
            domain
          }
        />

        <EventTimeline
          domain={
            domain
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CommandEventTracePanel
          commandId={
            selectedCommand
          }
        />

        <EventProjectionTracePanel
          eventType={
            selectedEventType
          }
        />
      </div>

      <EventReplayPanel
        eventId={
          state.selectedEventId
        }
      />

      <EventStreamStatus />
    </section>
  );
}
