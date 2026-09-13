export type Selector<TState, TResult> =
  (state: TState) => TResult

export class SelectorRegistry<
  TState,
> {
  private readonly selectors =
    new Map<
      string,
      Selector<TState, unknown>
    >()

  register<TResult>(
    name: string,
    selector: Selector<TState, TResult>,
  ): void {
    this.selectors.set(
      name,
      selector as Selector<
        TState,
        unknown
      >,
    )
  }

  select<TResult>(
    name: string,
    state: TState,
  ): TResult {
    const selector =
      this.selectors.get(name)

    if (!selector) {
      throw new Error(
        `Selector not registered: ${name}`,
      )
    }

    return selector(state) as TResult
  }
}
