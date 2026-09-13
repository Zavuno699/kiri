export interface DataGraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: string;
  required: boolean;
  active: boolean;
}
