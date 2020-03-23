// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// UI Component Imports
import Button from 'react-bootstrap/Button'

// App Imports
import itemRoutes from '../../../../../setup/routes/item'

const EditButton = (props) => {
    const { children, itemId, variant } = props

    return (
        <Link to={itemRoutes.editItem.path(itemId)}>
            <Button variant={variant || "warning"}>{ children || 'Edit'}</Button>
        </Link>
    )
}

// Component Properties
EditButton.propTypes = {
    itemId: PropTypes.number.isRequired
}

export default EditButton