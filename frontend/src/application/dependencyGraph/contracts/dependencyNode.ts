export interface DependencyNode {
  key: string;
  category:
    | "runtime"
    | "service"
    | "repository"
    | "provider"
    | "controller"
    | "feature"
    | "ui";
  required: boolean;
  dependencies: string[];
}
