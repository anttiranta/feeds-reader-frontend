// Imports
import React from 'react'

// UI Component Imports
import Table from 'react-bootstrap/Table'

// App Imports
import ItemInterface from '../types/ItemInterface';

// Component Properties
interface ItemInfoProps {
    item: ItemInterface
}

// Component
const ItemInfo: React.FC<ItemInfoProps> = ({ item }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Item Info:</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Title:</td>
                    <td>{item.title}</td>
                </tr>
                <tr>
                    <td>Description:</td>
                    <td>{item.description}</td>
                </tr>
                <tr>
                    <td>Link:</td>
                    <td>{item.link}</td>
                </tr>
                <tr>
                    <td>Published At:</td>
                    <td>{item.pubDate}</td>
                </tr>
                <tr>
                    <td>Comments:</td>
                    <td>{item.comments}</td>
                </tr>
                <tr>
                    <td>Category:</td>
                    <td>{item.category ? (item.category.name + ' - ' +  item.category.domain) : ''}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default ItemInfo