// Imports
import React from 'react'

// App Imports
import ShowButton from './item/buttons/ShowButton'
import EditButton from './item/buttons/EditButton'
import DeleteButton from './item/buttons/DeleteButton'
import ItemInterface from '../types/ItemInterface';

// Component Properties
interface ItemProps {
    item: ItemInterface
}

// Component
const Item: React.FC<ItemProps> = ({ item }) => {
    return (
        <>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.link}</td>
            <td>{item.pubDate}</td>
            <td>{item.category ? item.category.name : ''}</td>
            <td style={{width: "20%"}}>
                <ShowButton itemId={item.id}>Show</ShowButton>{' '}
                <EditButton itemId={item.id}>Edit</EditButton>{' '}
                <DeleteButton itemId={item.id}>Delete</DeleteButton>
            </td>
        </>
    )
}

export default Item