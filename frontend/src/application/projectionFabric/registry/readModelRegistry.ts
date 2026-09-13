import type {
  ReadModelDefinition,
} from "../contracts/readModelDefinition";

const models = new Map<
  string,
  ReadModelDefinition
>();

export function registerReadModel(
  model: ReadModelDefinition,
): void {
  models.set(
    model.id,
    model,
  );
}

export function getReadModel(
  modelId: string,
): ReadModelDefinition | null {
  return (
    models.get(
      modelId,
    ) ??
    null
  );
}

export function listReadModels(): ReadModelDefinition[] {
  return [
    ...models.values(),
  ];
}

export function listReadModelsByDomain(
  domain: string,
): ReadModelDefinition[] {
  return listReadModels().filter(
    (model) =>
      model.domain ===
      domain,
  );
}
