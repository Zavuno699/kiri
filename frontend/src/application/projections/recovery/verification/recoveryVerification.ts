export type RecoveryVerification = {
  projectionKey: string;
  recovered: boolean;
  checkpointSequence?: number;
  finalSequence: number;
  verifiedAt: string;
  reasons: string[];
};
