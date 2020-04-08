// Imports
import React from 'react'
import { Link } from 'react-router-dom'

// UI Component Imports
import Button from 'react-bootstrap/Button'

// App Imports
import itemRoutes from '../../../../../setup/routes/item'

const NewActionButton = () => {
    return (
        <Link to={itemRoutes.createItem.path}>
            <Button variant="success">Add Item</Button>
        </Link>
    )
}

export default NewActionButton