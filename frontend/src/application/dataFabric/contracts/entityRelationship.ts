export type EntityReference = { domain: string; id: string };
export type RelationshipType =
  | "contains"
  | "belongs-to"
  | "authorizes"
  | "controls"
  | "secures"
  | "pays"
  | "serves"
  | "projects"
  | "depends-on"
  | "linked-to";

export interface EntityRelationship {
  id: string;
  source: EntityReference;
  target: EntityReference;
  type: RelationshipType;
  required: boolean;
  active: boolean;
  createdAt: string;
}
