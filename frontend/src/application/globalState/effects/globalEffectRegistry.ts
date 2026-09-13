import type {
  GlobalStateEffect,
} from "../contracts/stateEffect";

const effects:
  GlobalStateEffect[] = [];

export function registerGlobalStateEffect(
  effect: GlobalStateEffect,
): void {
  effects.push(
    effect,
  );
}

export function listGlobalStateEffects(): GlobalStateEffect[] {
  return [
    ...effects,
  ];
}
