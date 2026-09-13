
export interface SessionClock {
  now(): number;
}

export const browserSessionClock: SessionClock = {
  now: () => Date.now(),
};

