// Imports
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useMutation } from '@apollo/react-hooks';

// UI Component Imports
import Button from 'react-bootstrap/Button'

// App Imports
import removeItem from '../../../graphql/mutations/removeItem'
import { setError, setSuccess } from '../../../../common/component/notification/redux/actions'
import { updateQueryVersion } from '../../../redux/item/list/actions'
import { ItemListQueryState } from '../../../redux/item/list/types'

// Component State
function deleteButtonStates (state: { itemListQuery: ItemListQueryState }) {
    return {
        itemListQuery: state.itemListQuery,
    }
}

const connector = connect(
    deleteButtonStates, 
    { 
        setError,
        setSuccess,
        updateQueryVersion 
    }
)

// Component Properties
type PropsFromRedux = ConnectedProps<typeof connector>
type DeleteButtonProps = PropsFromRedux & {
    itemId: number,
    children?: string
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
const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
    const [deleteItem, { loading }] = useMutation(removeItem, {
        onError: (error) => {
            props.setError('We could not remove the item. Please try again later.')
        },
        onCompleted: (data) => {
            const newVersion = props.itemListQuery.version + 1
            props.updateQueryVersion(newVersion) // force list refresh

            props.setSuccess('Item removed successfully.')
        }
    })

    const { children, itemId, variant } = props

    const onClickRemove = async () => {
        if (window.confirm(`Are you sure you want to remove this item?`)) {
            deleteItem({ variables: { id: itemId } });
        }
    }

    return (
        <Button 
            onClick={onClickRemove}
            disabled={loading}
            variant={variant || "danger"}>
                { children || 'Delete'}
        </Button>
    )
}

export default connector(DeleteButton)