// App Imports
import {
    ITEMS_GET_LIST_QUERY_UPDATE,
    ITEMS_GET_LIST_QUERY_FORCE_REFRESH
} from './actions'

// Initial State
const queryInitialState = {
    version: 1,
    urlSearchParams: new URLSearchParams({ "p": 1, "limit": 5 }),
}

// State
const itemListQuery = (state = queryInitialState, action) => {
    switch (action.type) {
        case ITEMS_GET_LIST_QUERY_UPDATE:
            return {
                ...state,
                urlSearchParams: action.urlSearchParams,
            }
        case ITEMS_GET_LIST_QUERY_FORCE_REFRESH:
            return {
                ...state,
                version: action.version
            }
        default:
            return state
    }
}

export default itemListQuery