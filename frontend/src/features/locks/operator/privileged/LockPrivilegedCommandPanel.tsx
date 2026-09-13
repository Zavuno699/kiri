import {
  evaluateCommandAuthorization,
} from "../../../application/commandAuthorization/evaluator/commandAuthorizationEvaluator";

export function LockPrivilegedCommandPanel() {
  const result = evaluateCommandAuthorization({
    command: "lock.command",
    capability: "locks.command",
    domain: "locks",
    dangerous: true,
    mutating: true,
  });

  return (
    <section className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
      <div className="text-sm font-semibold">
        Lock command authorization
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
