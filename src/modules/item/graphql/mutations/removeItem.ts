import { gql } from 'apollo-boost'

const REMOVE_ITEM = gql`
mutation removeItem($id: Int!) {
    removeItem(id: $id)
  }
`

export default REMOVE_ITEM