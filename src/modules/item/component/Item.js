// Imports
import React from 'react'

// App Imports
import ShowButton from './item/buttons/ShowButton'
import EditButton from './item/buttons/EditButton'
import DeleteButton from './item/buttons/DeleteButton'

const Item = ({ item }) => {
    const itemId = parseInt(item.id)

    return (
        <>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.link}</td>
            <td>{item.pubDate}</td>
            <td>{item.category ? item.category.name : ''}</td>
            <td width="20%">
                <ShowButton itemId={itemId}>Show</ShowButton>{' '}
                <EditButton itemId={itemId}>Edit</EditButton>{' '}
                <DeleteButton itemId={itemId}>Delete</DeleteButton>
            </td>
        </>
    )
}

export default Item