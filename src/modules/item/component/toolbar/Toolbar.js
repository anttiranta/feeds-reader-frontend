// Imports
import React from 'react'

// App Imports
import SearchForm from './SearchForm'
import NewActionButton from '../item/buttons/NewActionButton'

const Toolbar = (props) => {
    return (
        <>
            {/* Left side action(s) */}
            <NewActionButton />

            {/* Right side action(s) */}
            <div style={{ marginBottom: '8px', float: 'right' }}>
                <SearchForm />
            </div>
        </>
    )
}

export default Toolbar