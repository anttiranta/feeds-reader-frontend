// Imports
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

// App imports
import {
    ItemListQueryState
} from './types'

// Actions Types
export enum ActionType {
    ITEMS_GET_LIST_QUERY_UPDATE = 'ITEMS/GET_LIST_QUERY_UPDATE',
    ITEMS_GET_LIST_QUERY_FORCE_REFRESH = 'ITEMS/GET_LIST_QUERY_FORCE_REFRESH'
}

// Actions

// Update URL parameters
export function updateQueryConditions(
    urlSearchParams: URLSearchParams
): ThunkAction<void, ItemListQueryState, unknown, Action<string>> {
    return async dispatch => {
        dispatch({
            type: ActionType.ITEMS_GET_LIST_QUERY_UPDATE,
            urlSearchParams,
        })
    }
}

// Force query refresh
export function updateQueryVersion(
    version: number
): ThunkAction<void, ItemListQueryState, unknown, Action<string>> {
    return async dispatch => {
        dispatch({
            type: ActionType.ITEMS_GET_LIST_QUERY_FORCE_REFRESH,
            version,
        })
    }
}