// Imports
import React from 'react'
import { connect } from 'react-redux'

// UI Component Imports
import Alert from 'react-bootstrap/Alert'

// App Imports
import MessageInterface from "./MessageInterface";
import { getBootstrapNotificationType } from './bootstrapNotificationTypeMap'
import {
  NotificationState
} from './redux/types'

interface NotificationProps {
  message: MessageInterface
}

// Component
const Notification: React.FC<NotificationProps> = ({ message }) => {
    if (message.getText() === null) {
        return null
    }

    return (
      <Alert variant={getBootstrapNotificationType(message.getType())}>
          {message.getText()}
      </Alert>
    )
}

// Component State
const mapStateToProps = (
  state: { message: NotificationState }
): NotificationProps => {
  return {
    message: state.message.message
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)