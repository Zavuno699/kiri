import type {
  OperationalContext,
} from "../../../application/operationalViews/context/operationalContext";

interface Props {
  context:
    OperationalContext;
}

const items: Array<{
  key:
    keyof OperationalContext;
  label: string;
}> = [
  {
    key:
      "property",
    label:
      "Property",
  },
  {
    key:
      "lease",
    label:
      "Lease",
  },
  {
    key:
      "payment",
    label:
      "Payment",
  },
  {
    key:
      "device",
    label:
      "Device",
  },
  {
    key:
      "lock",
    label:
      "Lock",
  },
  {
    key:
      "security",
    label:
      "Security",
  },
];

export function OperationalContextStrip({
  context,
}: Props) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(
        ({
          key,
          label,
        }) => {
          const entity =
            context[key];

          return (
            <div
              key={key}
              className="rounded-lg border border-slate-800 bg-slate-950/40 p-3"
            >
              <div className="text-[11px] uppercase tracking-wider text-slate-500">
                {label}
              </div>

              <div className="mt-1 text-xs text-slate-300">
                {entity?.title ??
                  "Not resolved"}
              </div>

              <div className="mt-1 text-[10px] text-slate-600">
                {entity?.status ??
                  "unknown"}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}
