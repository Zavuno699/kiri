import { RelationChips } from "../../../../components/operator/relations/RelationChips"

export function SecurityRelations({
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
