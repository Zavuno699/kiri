import {
  getCommandConfirmationState,
  confirmCommand,
  cancelCommandConfirmation,
} from "../../../../application/commandAuthorization/confirmation/confirmationStore";

export function CommandConfirmationPanel() {
  const state = getCommandConfirmationState();

  if (!state.open) {
    return null;
  }

  return (
    <section className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
      <div className="text-sm font-semibold">
        Confirm privileged command
      </div>

      <div className="mt-2 text-xs text-slate-400">
        {state.command ?? "Unknown command"}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={confirmCommand}
          className="rounded-lg border border-green-500/30 px-3 py-2 text-xs text-green-200"
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={cancelCommandConfirmation}
          className="rounded-lg border border-slate-700/60 px-3 py-2 text-xs text-slate-300"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
