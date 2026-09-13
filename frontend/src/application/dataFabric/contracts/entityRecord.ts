export interface EntityRecord<T = unknown> {
  id: string;
  domain: string;
  type: string;
  data: T;
  version: number;
  createdAt: string | null;
  updatedAt: string | null;
}
