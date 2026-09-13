import {
  listRelationships,
} from "../relationships/relationshipStore";

export function findRelationshipPath(
  sourceId: string,
  targetId: string,
): string[] {
  const visited = new Set<
    string
  >();

  const queue: Array<{
    id: string;
    path: string[];
  }> = [
    {
      id:
        sourceId,
      path:
        [sourceId],
    },
  ];

  while (queue.length) {
    const current =
      queue.shift();

    if (!current) {
      break;
    }

    if (
      current.id ===
      targetId
    ) {
      return current.path;
    }

    if (
      visited.has(
        current.id,
      )
    ) {
      continue;
    }

    visited.add(
      current.id,
    );

    for (
      const relationship of
        listRelationships()
    ) {
      if (
        relationship.source.id !==
        current.id
      ) {
        continue;
      }

      queue.push({
        id:
          relationship.target.id,
        path: [
          ...current.path,
          relationship.target.id,
        ],
      });
    }
  }

  return [];
}
