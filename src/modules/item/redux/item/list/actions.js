// Actions Types
export const ITEMS_GET_LIST_QUERY_UPDATE = 'ITEMS/GET_LIST_QUERY_UPDATE'
export const ITEMS_GET_LIST_QUERY_FORCE_REFRESH = 'ITEMS/GET_LIST_QUERY_FORCE_REFRESH'

// Actions

// Update URL parameters
export function updateQueryConditions(urlSearchParams) {
    return async dispatch => {
        dispatch({
            type: ITEMS_GET_LIST_QUERY_UPDATE,
            urlSearchParams,
        })
    }
}

// Force query refresh
export function updateQueryVersion(version) {
    return async dispatch => {
        dispatch({
            type: ITEMS_GET_LIST_QUERY_FORCE_REFRESH,
            version,
        })
    }
}