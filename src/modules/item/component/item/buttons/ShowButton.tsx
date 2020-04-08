// Imports
import React from 'react'
import { Link } from 'react-router-dom'

// UI Component Imports
import Button from 'react-bootstrap/Button'

// App Imports
import itemRoutes from '../../../../../setup/routes/item'

// Component Properties
interface ShowButtonProps {
    itemId: number
    children?: string
}

// Component
const ShowButton: React.FC<ShowButtonProps> = (props) => {
    const { children, itemId } = props

    return (
        <Link to={itemRoutes.showItem.path(itemId)}>
            <Button variant="success">{ children || 'Show'}</Button>
        </Link>
    )
}

export default ShowButton