import type {
  MutableRepository,
} from "../../application/repositories/repository"

export class MemoryRepository<T extends { id: string }>
  implements MutableRepository<T>
{
  private readonly records =
    new Map<string, T>()

  async list(): Promise<T[]> {
    return Array.from(
      this.records.values(),
    )
  }

  async get(
    id: string,
  ): Promise<T | undefined> {
    return this.records.get(id)
  }

  async save(value: T): Promise<void> {
    this.records.set(value.id, value)
  }

  async remove(id: string): Promise<void> {
    this.records.delete(id)
  }
}
