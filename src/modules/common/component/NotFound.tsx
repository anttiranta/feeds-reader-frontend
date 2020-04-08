// Imports
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// App Imports
import itemRoutes from '../../../setup/routes/item'

const NotFound = () => (
    <div>
        {/* SEO */}
        <Helmet>
            <title>Page not found</title>
        </Helmet>

        <div style={{ backgroundColor: 'lightgray', padding: '20px' }}>
            <h2>Page not found</h2>

            <p style={{ marginTop: '2em' }}>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
            <p style={{ marginTop: '0.5em' }}><Link to={itemRoutes.home.path}>&larr; Back to our site</Link></p>
        </div>
    </div>
)

export default NotFound