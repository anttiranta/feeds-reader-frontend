// Imports
import { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql';

// App Imports
import {
    isoDateTimeToDateAndTime,
    createIsoDateTimeFromDateAndTime
} from '../helper/dateHelper'
import ItemInteface from '../types/ItemInterface'

// Hook Properties
type UseItemFormProps = RouteComponentProps & {
    createOrUpdateItemMutation: DocumentNode,
    onError: () => void,
    onSuccess: (id: number) => void,
}

// Hook
const useItemForm = (props: UseItemFormProps) => {
    const [validated, setValidated] = useState(false);
    const {
        createOrUpdateItemMutation,
        onError,
        onSuccess
    } = props;

    const [createOrUpdateItem, { loading }] = useMutation(createOrUpdateItemMutation, {
        onError: (error) => { 
            onError();
        },
        onCompleted: (data) => {
            onSuccess(data.updateItem.id ? data.updateItem.id : data.createItem.id);
        }
    })

    const handleSubmit = async (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        const form = event.currentTarget;

        const isValid = form.checkValidity()
        setValidated(true);

        if (isValid) {
            const id = parseInt(form.id.value)
            const title = form.title.value
            const description = form.description.value
            const link = form.link.value
            const pubDate = createIsoDateTimeFromDateAndTime(
                form.pubDate.value,
                form.pubTime.value,
                form.pubTimeZone.value
            )
            const comments = form.comments.value
            const categoryId = form.categoryId ? parseInt(form.categoryId.value) : 0

            if (id > 0) {
                createOrUpdateItem({ variables: { input: {id, title, description, link, pubDate, comments, categoryId} } })
            } else {
                createOrUpdateItem({ variables: { input: {title, description, link, pubDate, comments, categoryId} } })
            }
        }
    };

    const handleCancel = (event: React.BaseSyntheticEvent) => {
        event.preventDefault()
        props.history.goBack()
    }

    const getItemPubDateValues = (item: ItemInteface) => {
        return item && item.pubDate ? isoDateTimeToDateAndTime(item.pubDate) : []
    }

    return {
        handleCancel,
        handleSubmit,
        getItemPubDateValues,
        isLoading: loading,
        isValidated: validated
    }
}

export default useItemForm