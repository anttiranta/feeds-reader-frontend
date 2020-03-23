// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Component Imports
import Spinner from 'react-bootstrap/Spinner'

// Component
const Loading = (props) => {
  const { variant } = props

  return (
    <Spinner animation="border" role="status" variant={variant || "primary"}>
      <span className="sr-only">{props.message ? props.message : 'Loading...'}</span>
    </Spinner>
  )
}

// Component Properties
Loading.propTypes = {
  message: PropTypes.string
}

export default Loading