import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function DegradedModeBanner() {
  const state =
    getDegradedModeState();

  if (!state.active) {
    return null;
  }

  return (
    <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs text-amber-100">
      Frontend operating in degraded mode.
      {state.reason
        ? ` ${state.reason}`
        : ""}
    </div>
  );
}
