// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// UI Component Imports
import Button from 'react-bootstrap/Button'

// App Imports
import itemRoutes from '../../../../../setup/routes/item'

const ShowButton = (props) => {
    const { children, itemId } = props

    return (
        <Link to={itemRoutes.showItem.path(itemId)}>
            <Button variant="success">{ children || 'Show'}</Button>
        </Link>
    )
}

// Component Properties
ShowButton.propTypes = {
    itemId: PropTypes.number.isRequired
}

export default ShowButton