// App Imports
import { NotificationActionTypes, NotificationState } from "./types";
import { ActionType } from "./actions";
import MessageInterface from "../MessageInterface";
import { Type } from "../MessageInterface";

class NullMessage implements MessageInterface {
  getType() {
    return Type.TYPE_NOTICE
  }

  getText(): string {
    return null;
  }

  setText(text: string) {
    // Ignore
  }
}

const initialState: NotificationState = {
  message: new NullMessage(),
};

const notification = (
  state = initialState,
  action: NotificationActionTypes
): NotificationState => {
  switch (action.type) {
    case ActionType.SET_MESSAGE:
      return {
        message: action.payload
      };
    case ActionType.DELETE_MESSAGE:
      return {
        message: initialState.message
      };
    default:
      return state;
  }
};

export default notification;
