import type {
  StorageAdapter,
} from "./storageTypes"

export class MemoryStorage
  implements StorageAdapter
{
  private readonly values = new Map<
    string,
    unknown
  >()

  get<T>(key: string): T | undefined {
    return this.values.get(key) as T | undefined
  }

  set<T>(
    key: string,
    value: T,
  ): void {
    this.values.set(key, value)
  }

  remove(key: string): void {
    this.values.delete(key)
  }

  clear(): void {
    this.values.clear()
  }
}

export const clientStorage =
  new MemoryStorage()
