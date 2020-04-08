import { gql } from 'apollo-boost'

const GET_ITEM_LIST = gql`
    query items($limit: Int, $p: Int, $filter: ItemFilterInput) {
        items(limit: $limit, p: $p, filter: $filter) { 
            totalCount, items {id, title, link, pubDate, category {id, name}}
        }
    }
`

export default GET_ITEM_LIST