import {
  listSagas,
} from "../../../application/transactionFabric/registry/sagaRegistry";

export function SagaPanel() {
  const sagas =
    listSagas();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Saga definitions
      </div>

      <div className="mt-3 space-y-2">
        {sagas.map(
          (saga) => (
            <div
              key={saga.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-200">
                {saga.label}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {saga.description}
              </div>

              <div className="mt-2 text-[10px] text-slate-600">
                steps:{" "}
                {saga.stepIds.length}
                {" · compensation: "}
                {saga.compensationIds.length}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
