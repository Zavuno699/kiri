import type {
  Provider,
} from "../../application/providers/provider"

export class UnavailableProvider
  implements Provider
{
  constructor(
    public readonly name: string,
  ) {}

  readonly available = false
}
