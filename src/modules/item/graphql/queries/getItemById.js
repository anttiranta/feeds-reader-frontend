import { gql } from 'apollo-boost'

const GET_ITEM = gql`
    query getItem($id: Int!) {
        getItemById(id: $id) { 
            id, title, link, description, pubDate, comments, category {id, name, domain} 
        }
    }
`

export default GET_ITEM