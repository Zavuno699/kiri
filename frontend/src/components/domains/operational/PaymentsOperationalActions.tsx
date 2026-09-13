import {
  createPaymentsViewModel,
} from "../../../features/payments/ui/runtime/createPaymentsViewModel";

export function PaymentsOperationalActions() {
  const model =
    createPaymentsViewModel();

  return (
    <div className="flex flex-wrap gap-2">
      {model.actions.map(
        (action) => (
          <div
            key={action.key}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300"
          >
            {action.label}
          </div>
        ),
      )}
    </div>
  );
}
