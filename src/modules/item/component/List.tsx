// Imports
import React from 'react'

// UI Component Imports
import Table from 'react-bootstrap/Table'

// App Imports
import Item from './Item';
import ItemInterface from '../types/ItemInterface';

// Component Properties
interface ListProps {
    items: ItemInterface[]
}

// Component
const List: React.FC<ListProps> = ({ items }) => {
    return (
        <>
            {
                items.length > 0
                    ? <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Link</th>
                                <th>Published At</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item =>
                                <tr key={'tr-' + item.id}>
                                    <Item item={item} />
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    : <p>No items found.</p>
            }
        </>
    )
}

export default List