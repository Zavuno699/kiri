import {
  getVisibleNavigationItems,
} from "../guards/navigationVisibility";

export function buildNavigationGroups() {
  const visible =
    getVisibleNavigationItems();

  return [
    {
      key:
        "primary",
      label:
        "Operations",
      items:
        visible
          .sort(
            (a, b) =>
              a.order -
              b.order,
          ),
    },
  ];
}
