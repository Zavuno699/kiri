export type ProjectionReplayPlanStep = {
  projectionKey: string;
  domain: string;
  entityId?: string;
  fromSequence: number;
  toSequence?: number;
  order: number;
  blocking: boolean;
};

export type ProjectionReplayPlan = {
  planId: string;
  createdAt: string;
  mode: "resume" | "rebuild" | "repair";
  steps: ProjectionReplayPlanStep[];
};
