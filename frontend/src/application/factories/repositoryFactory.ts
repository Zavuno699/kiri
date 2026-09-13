import type {
  Repository,
} from "../repositories/repository"

export interface RepositoryFactory {
  create<T>(): Repository<T>
}
