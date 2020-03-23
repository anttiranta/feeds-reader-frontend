// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Component Imports
import Table from 'react-bootstrap/Table'

// App Imports
import Item from './Item';

const List = ({ items }) => {
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

// Component Properties
List.propTypes = {
    items: PropTypes.array.isRequired
}

export default List