export type ReplayVerificationResult = {
  projectionKey: string;
  sourceSequence: number;
  materializedSequence: number;
  sourceVersion: number;
  materializedVersion: number;
  consistent: boolean;
  verifiedAt: string;
  reasons: string[];
};
