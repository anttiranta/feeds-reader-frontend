import { gql } from 'apollo-boost'

const ALL_CATEGORIES = gql`
{
    categories {
      categories {id, name}
  }
}
`
export default ALL_CATEGORIES