export interface OperationalRelationshipView {
  id: string;
  sourceId: string;
  sourceType: string;
  targetId: string;
  targetType: string;
  relationship: string;
  required: boolean;
  active: boolean;
}
