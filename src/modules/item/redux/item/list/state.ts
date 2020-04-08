// App Imports
import { ItemListQueryActionTypes, ItemListQueryState } from "./types";
import { ActionType } from "./actions";

// Initial State
const queryInitialState: ItemListQueryState = {
    version: 1,
    urlSearchParams: new URLSearchParams([["p", "1"], ["limit", "5"]]),
}

// State
const itemListQuery = (
    state = queryInitialState, 
    action: ItemListQueryActionTypes
): ItemListQueryState => {
    switch (action.type) {
        case ActionType.ITEMS_GET_LIST_QUERY_UPDATE:
            return {
                ...state,
                urlSearchParams: action.urlSearchParams,
            }
        case ActionType.ITEMS_GET_LIST_QUERY_FORCE_REFRESH:
            return {
                ...state,
                version: action.version
            }
        default:
            return state
    }
}

export default itemListQuery