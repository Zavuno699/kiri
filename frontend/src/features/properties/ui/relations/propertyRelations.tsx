import { RelationChips } from "../../../../components/operator/relations/RelationChips"

export function PropertyRelations({
  items = [],
}: {
  items?: Array<{
    id: string
    label: string
    domain: string
  }>
}) {
  return <RelationChips relations={items} />
}
