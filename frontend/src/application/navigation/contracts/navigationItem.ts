export interface NavigationItem {
  key: string;
  label: string;
  route: string;
  domain: string;
  capability: string;
  icon?: string;
  parentKey?: string;
  order: number;
  visible: boolean;
}
