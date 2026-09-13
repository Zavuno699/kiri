export interface GlobalStateAction<T = unknown> {
  type: string;
  domain?: string;
  payload?: T;
  source?: string;
}
