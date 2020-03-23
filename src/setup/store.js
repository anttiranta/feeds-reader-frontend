// Imports
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// App imports
import itemListQuery from '../modules/item/redux/item/list/state'
import notification from '../modules/common/component/notification/state'

// App Reducer
const appReducer = combineReducers({
  message: notification,
  itemListQuery
})

// Root Reducer
export const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
      state = undefined
    }
    return appReducer(state, action)
}

// Store
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store