import {
  evaluateCommandAuthorization,
} from "../../../../application/commandAuthorization/evaluator/commandAuthorizationEvaluator";

export function SecurityAdminActionPanel() {
  const result = evaluateCommandAuthorization({
    command: "security.admin",
    capability: "security.admin",
    domain: "security",
    dangerous: true,
    mutating: true,
  });

  return (
    <section className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
      <div className="text-sm font-semibold">
        Security administration authorization
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
