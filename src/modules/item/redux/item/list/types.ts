// App Imports
import {
  ActionType,
} from './actions'

export interface ItemListQueryState {
    urlSearchParams: URLSearchParams,
    version: number
}

interface UpdateQueryAction {
  type: typeof ActionType.ITEMS_GET_LIST_QUERY_UPDATE
  urlSearchParams: URLSearchParams
}

interface ForceRefreshAction {
  type: typeof ActionType.ITEMS_GET_LIST_QUERY_FORCE_REFRESH
  version: number
}

export type ItemListQueryActionTypes = UpdateQueryAction | ForceRefreshAction