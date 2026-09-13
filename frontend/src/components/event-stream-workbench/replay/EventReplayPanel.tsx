import {
  useState,
} from "react";

import {
  requestEventReplay,
} from "../../../application/eventStream/replay/requestEventReplay";

interface Props {
  eventId: string | null;
}

export function EventReplayPanel({
  eventId,
}: Props) {
  const [
    message,
    setMessage,
  ] = useState(
    "No replay request made.",
  );

  function requestReplay() {
    if (!eventId) {
      setMessage(
        "Select an event first.",
      );
      return;
    }

    const result =
      requestEventReplay(
        eventId,
      );

    setMessage(
      result.message,
    );
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Replay control
      </div>

      <button
        type="button"
        onClick={
          requestReplay
        }
        disabled={
          !eventId
        }
        className="mt-3 rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-xs text-blue-200 disabled:opacity-40"
      >
        Prepare replay request
      </button>

      <div className="mt-3 text-xs text-slate-500">
        {message}
      </div>
    </section>
  );
}
