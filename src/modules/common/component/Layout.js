// Imports
import React from 'react'

// App Imports
import Notification from './notification/Notification'

const Layout = (props) => {
    return (
        <div id="main-container">
            <Notification />
            
            {/* Page Content */}
            <div style={{ margin: '15px' }}>
                {props.children}
            </div>
        </div>
    )
}

export default Layout