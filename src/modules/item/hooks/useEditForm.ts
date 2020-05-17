// Imports
import { useEffect, useRef } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql';

// App Imports
import GetItemParams from '../types/item/form/GetItemParams'
import EditFormProps from '../types/item/form/EditFormProps'

// Hook Properties
type UseEditFormProps = EditFormProps & {
    getItemQuery: DocumentNode
}

// Hook
const useEditForm = (props: UseEditFormProps) => {
    const prevProps = useRef(null)

    const { getItemQuery } = props;
    const itemId = props.match.params.id

    const [getItem, { called, loading, error, data }] = useLazyQuery(getItemQuery, new GetItemParams(itemId))
    const item = data ? data.getItemById : undefined

    useEffect(() => {
        if (prevProps.current === null 
            || prevProps.current.location.pathname !== props.location.pathname) {
            if (itemId) {
                getItem(new GetItemParams(itemId))
            }
        }
        prevProps.current = props
    }, [props, itemId, getItem])

    const isNewEntry = () => {
        return itemId === undefined
    }

    return {
        isNewEntry,
        getItem,
        item,
        hasError: error,
        isLoading: loading,
        fetchCalled: called
    }
}

export default useEditForm