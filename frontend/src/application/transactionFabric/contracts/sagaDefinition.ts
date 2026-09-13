export interface SagaDefinition {
  id: string;
  transactionId: string;
  name: string;
  label: string;
  description: string;
  stepIds: string[];
  compensationIds: string[];
  enabled: boolean;
}
