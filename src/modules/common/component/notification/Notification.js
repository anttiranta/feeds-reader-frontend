// Imports
import React from 'react'
import { connect } from 'react-redux'

// UI Component Imports
import Alert from 'react-bootstrap/Alert'

// App Imports
import { getBootstrapNotificationType } from './bootstrapNotificationTypeMap'

// Message Types
export const TYPE_ERROR = 'error'
export const TYPE_NOTICE = 'notice'
export const TYPE_SUCCESS = 'success'

const Notification = ({ message, type = null}) => {
    if (message === null) {
        return null
    }
    if (![TYPE_ERROR, TYPE_NOTICE, TYPE_SUCCESS].includes(type)) {
        type = TYPE_NOTICE;
    }

    return (
        <Alert variant={getBootstrapNotificationType(type)}>
            {message}
        </Alert>
    )
}

const mapStateToProps = (state) => {
  const getMessageData = ({message}) => {
    if(Array.isArray(message)) {
      return message
    }
    return [null, null]
  }
  const [message, type] = getMessageData(state)

  return {
    message: message,
    type: type
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)