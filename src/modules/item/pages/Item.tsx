// Imports
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router-dom'

// UI Component Imports
import Button from 'react-bootstrap/Button'

// App Imports
import EditButton from '../component/item/buttons/EditButton'
import ItemInfo from '../component/ItemInfo'
import Loading from '../../common/component/Loading';
import getItemById from '../graphql/queries/getItemById'
import { renderIf } from '../../../utils/elementUtils'
import { routes } from '../../../setup/routes'
import itemRoutes from '../../../setup/routes/item'

// Route Params
type ItemRouteParams = {
    id?: string,
}

// Component
const Item: React.FC<RouteComponentProps<ItemRouteParams>> = (props) => {
    const { loading, error, data } = useQuery(getItemById, {
        variables: { id: parseInt(props.match.params.id) },
    })

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Redirect to={routes.notFound.path} />
    }
    let item = data ? data.getItemById : []

    const handleGoBack = (event: React.BaseSyntheticEvent) => {
        event.preventDefault()
        props.history.push(itemRoutes.home.path)
    }

    return (
        <>
        {
            renderIf(item && item.id, () => (
                <div>
                    {/* SEO */}
                    <Helmet>
                        <title>{`Item - ${ item.title }`}</title>
                    </Helmet>

                    {/* Content */}
                    <h1>{`Item - ${ item.title }`}</h1>
                    <ItemInfo item={item} />

                    {/* Button(s) */}
                    <EditButton variant="primary" itemId={parseInt(item.id)}>Edit Item</EditButton>{' '}
                    <Button variant="secondary" onClick={handleGoBack}>Back to list</Button>
                </div>
            ))
        }
        </>
    )
}

export default withRouter(Item)