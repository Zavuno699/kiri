export type ProjectionRefreshPlanStep = {
  key: string;
  domain: string;
  projection: string;
  entityId?: string;
  order: number;
  blocking: boolean;
};

export type ProjectionRefreshPlan = {
  planId: string;
  createdAt: string;
  steps: ProjectionRefreshPlanStep[];
};
