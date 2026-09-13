export interface Projector<E, P> {
  project(event: E): P
}
