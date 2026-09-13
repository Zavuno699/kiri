import { locksActionVisible } from "../visibility/actionVisibility";

export function canUseLocksOperatorAction(): boolean {
  return locksActionVisible();
}
