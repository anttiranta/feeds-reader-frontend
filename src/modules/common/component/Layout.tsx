// Imports
import React, { ReactNode } from 'react'

// App Imports
import Notification from './notification/Notification'

// Component Properties
interface LayoutProps {
    children: ReactNode
}

// Component
const Layout: React.FC<LayoutProps> = (props) => {
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