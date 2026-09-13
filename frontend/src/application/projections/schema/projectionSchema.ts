export type ProjectionSchemaField = {
  name: string;
  required: boolean;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "unknown";
};

export type ProjectionSchema = {
  projectionKey: string;
  version: string;
  fields: ProjectionSchemaField[];
};
