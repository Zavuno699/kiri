import {
  evaluateCommandAuthorization,
} from "../../../application/commandAuthorization/evaluator/commandAuthorizationEvaluator";

export function DevicePrivilegedCommandPanel() {
  const result = evaluateCommandAuthorization({
    command: "device.command",
    capability: "devices.command",
    domain: "devices",
    dangerous: true,
    mutating: true,
  });

  return (
    <section className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
      <div className="text-sm font-semibold">
        Device command authorization
      </div>
      <div className="mt-2 text-xs text-slate-400">
        {result.allowed
          ? result.requiresConfirmation
            ? "Authorized; confirmation required."
            : "Authorized."
          : "Restricted."}
      </div>
    </section>
  );
}
