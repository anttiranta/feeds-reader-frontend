// Imports
import React from 'react'

// UI Component Imports
import Spinner from 'react-bootstrap/Spinner'

// Component Properties
interface LoadingProps {
  variant?:
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  message?: string
}

// Component
const Loading: React.FC<LoadingProps> = (props) => {
  const { variant } = props

  return (
    <Spinner animation="border" role="status" variant={variant || "primary"}>
      <span className="sr-only">{props.message ? props.message : 'Loading...'}</span>
    </Spinner>
  )
}

export default Loading