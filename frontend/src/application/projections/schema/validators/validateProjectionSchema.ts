import type { ProjectionSchema } from "../projectionSchema";

export type ProjectionSchemaValidation = {
  valid: boolean;
  errors: string[];
};

function matchesType(
  value: unknown,
  expected: ProjectionSchema["fields"][number]["type"],
): boolean {
  switch (expected) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number";
    case "boolean":
      return typeof value === "boolean";
    case "object":
      return (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      );
    case "array":
      return Array.isArray(value);
    default:
      return true;
  }
}

export function validateProjectionSchema(
  state: Record<string, unknown>,
  schema: ProjectionSchema,
): ProjectionSchemaValidation {
  const errors: string[] = [];

  for (const field of schema.fields) {
    const value = state[field.name];

    if (
      field.required &&
      value === undefined
    ) {
      errors.push(`Missing required field: ${field.name}`);
      continue;
    }

    if (
      value !== undefined &&
      !matchesType(value, field.type)
    ) {
      errors.push(
        `Invalid type for field: ${field.name}`,
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
