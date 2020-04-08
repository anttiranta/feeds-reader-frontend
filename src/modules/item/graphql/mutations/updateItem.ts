import { gql } from 'apollo-boost'

const UPDATE_ITEM = gql`
mutation updateItem($input: ItemUpdateInput!) {
  updateItem(input: $input) {
      id, title, link, description, pubDate, comments, category {id, name, domain}
    }
  }
`

export default UPDATE_ITEM