import {
  findInvalidationTargets,
} from "./invalidationRegistry";

import {
  invalidatePersistence,
} from "../cache/invalidatePersistence";

export function runInvalidation(
  sourceDomain: string,
  sourceResource: string,
): string[] {
  const targets =
    findInvalidationTargets(
      sourceDomain,
      sourceResource,
    );

  const invalidated: string[] = [];

  for (const target of targets) {
    const key =
      `${target.targetDomain}:${target.targetResource}`;

    invalidatePersistence(key);

    invalidated.push(key);
  }

  return invalidated;
}
