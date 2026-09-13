import {
  ConsistencySummaryPanel,
} from "../../components/consistency/summary/ConsistencySummaryPanel";

import {
  ConsistencyCheckList,
} from "../../components/consistency/checks/ConsistencyCheckList";

import {
  ConsistencyScorePanel,
} from "../../components/consistency/score/ConsistencyScorePanel";

import {
  DegradedModeBanner,
} from "../../components/degradedMode/banner/DegradedModeBanner";

import {
  DegradedModePolicyPanel,
} from "../../components/degradedMode/policy/DegradedModePolicyPanel";

import {
  DomainHealthGrid,
} from "../../components/domainHealth/grid/DomainHealthGrid";

export function FrontendHealthPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <DegradedModeBanner />
        <ConsistencySummaryPanel />

        <div className="grid gap-4 lg:grid-cols-3">
          <ConsistencyScorePanel />
          <DegradedModePolicyPanel />
        </div>

        <DomainHealthGrid />
        <ConsistencyCheckList />
      </div>
    </main>
  );
}
