import { gql } from 'apollo-boost'

const GET_ITEM_LIST = gql`
    query items($limit: Int, $p: Int, $title: String) {
        items(limit: $limit, p: $p, title: $title) { 
            totalCount, items {id, title, link, pubDate, category {id, name}}
        }
    }
`

export default GET_ITEM_LIST