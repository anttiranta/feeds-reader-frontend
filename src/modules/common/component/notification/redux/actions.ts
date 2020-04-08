// Imports
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

// App imports
import { Type } from '../MessageInterface'
import MessageInterface from '../MessageInterface'
import {
  NotificationState
} from './types'
import Factory from '../Factory'

// Actions Types
export enum ActionType {
  SET_MESSAGE = 'NOTIFICATION/SET_MESSAGE',
  DELETE_MESSAGE = 'NOTIFICATION/DELETE_MESSAGE'
}

// Actions
export const setError = (message: string) => {
    return setMessage(
      Factory.create(Type.TYPE_ERROR, message)
    )
}

export const setNotice = (message: string) => {
    return setMessage(
      Factory.create(Type.TYPE_NOTICE, message)
    )
}

export const setSuccess = (message: string) => {
    return setMessage(
      Factory.create(Type.TYPE_SUCCESS, message)
    )
}

export const setMessage = (
  message: MessageInterface
): ThunkAction<void, NotificationState, unknown, Action<string>> => {
    const timeout = 3;

    return dispatch => {
      dispatch({
        type: ActionType.SET_MESSAGE,
        payload: message
      })
  
      // Hide message
      setTimeout(() => {
        dispatch({
          type: ActionType.DELETE_MESSAGE
        })
      }, timeout * 1000);
    }
}