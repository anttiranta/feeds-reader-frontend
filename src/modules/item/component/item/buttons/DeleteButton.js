// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useMutation } from '@apollo/react-hooks';

// UI Component Imports
import Button from 'react-bootstrap/Button'

// App Imports
import removeItem from '../../../graphql/mutations/removeItem'
import { setError, setSuccess } from '../../../../common/component/notification/actions'
import { updateQueryVersion } from '../../../redux/item/list/actions'

const DeleteButton = (props) => {
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

// Component State
function deleteButtonStates(state) {
    return {
      itemListQuery: state.itemListQuery,
    }
  }

// Component Properties
DeleteButton.propTypes = {
    itemId: PropTypes.number.isRequired,
    setError: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
    updateQueryVersion: PropTypes.func.isRequired,
    itemListQuery: PropTypes.object.isRequired,
}

export default connect(deleteButtonStates, {
    setError,
    setSuccess,
    updateQueryVersion
})(DeleteButton)