import {
  findRelationshipPath,
} from "./findRelationshipPath";

export function queryEntityGraph(
  sourceId: string,
  targetId: string,
) {
  return {
    sourceId,
    targetId,
    path:
      findRelationshipPath(
        sourceId,
        targetId,
      ),
  };
}
