// App Imports
import MessageInterface from "../MessageInterface";
import {
  ActionType,
} from './actions'

export interface NotificationState {
    message: MessageInterface
}

interface SendMessageAction {
  type: typeof ActionType.SET_MESSAGE
  payload: MessageInterface
}

interface DeleteMessageAction {
  type: typeof ActionType.DELETE_MESSAGE
}

export type NotificationActionTypes = SendMessageAction | DeleteMessageAction