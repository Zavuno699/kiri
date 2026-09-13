import {
  listGraphNodes,
  listGraphEdges,
} from "../../../application/dataFabric/graph/dataGraphStore";

export function DataFabricGraphPanel() {
  const nodes =
    listGraphNodes();

  const edges =
    listGraphEdges();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Global data graph
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          Nodes: {nodes.length}
        </div>

        <div>
          Relationships: {edges.length}
        </div>
      </div>
    </section>
  );
}
