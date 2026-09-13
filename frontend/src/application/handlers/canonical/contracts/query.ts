export interface Query<
  TInput = unknown,
> {
  type: string;
  input: TInput;
  correlationId?: string | null;
}
