import { gql } from 'apollo-boost'

const ADD_ITEM = gql`
mutation addNewItem($input: ItemCreationInput!) {
    createItem(input: $input) {
        id, title, link, description, pubDate, comments, category {id, name, domain}
    }
  }
`

export default ADD_ITEM