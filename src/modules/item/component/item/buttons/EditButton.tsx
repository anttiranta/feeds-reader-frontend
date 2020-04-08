// Imports
import React from 'react'
import { Link } from 'react-router-dom'

// UI Component Imports
import Button from 'react-bootstrap/Button'

// App Imports
import itemRoutes from '../../../../../setup/routes/item'

// Component Properties
interface EditButtonProps {
    itemId: number
    children?: string,
    variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'link'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-dark'
    | 'outline-light';
}

// Component 
const EditButton: React.FC<EditButtonProps> = (props) => {
    const { children, itemId, variant } = props

    return (
        <Link to={itemRoutes.editItem.path(itemId)}>
            <Button variant={variant || "warning"}>{ children || 'Edit'}</Button>
        </Link>
    )
}

export default EditButton