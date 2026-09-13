import { propertiesActionVisible } from "../visibility/actionVisibility";

export function RoleAwareActionPanel() {
  const visible = propertiesActionVisible();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-3">
      <div className="text-xs font-semibold">
        Properties operator actions
      </div>
      <div className="mt-2 text-[11px] text-slate-500">
        {visible ? "Action available" : "Action restricted"}
      </div>
    </section>
  );
}
