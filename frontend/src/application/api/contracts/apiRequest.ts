import type {
  ApiMethod,
} from "./apiMethod";

export interface ApiRequest<TBody = unknown> {
  method: ApiMethod;
  path: string;
  body?: TBody;
  query?: Record<
    string,
    string | number | boolean | undefined
  >;
  headers?: Record<string, string>;
  capability?: string;
}
