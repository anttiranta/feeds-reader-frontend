// Imports
import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useLazyQuery, QueryLazyOptions } from '@apollo/react-hooks'
import { Redirect, RouteComponentProps } from 'react-router-dom'

// App Imports
import ItemForm from '../component/ItemForm'
import Loading from '../../common/component/Loading';
import getItemById from '../graphql/queries/getItemById'
import { renderIf } from '../../../utils/elementUtils'
import { routes } from '../../../setup/routes'

// Route Params
type EditFormRouteParams = {
    id?: string,
}

// Get Item Query Params
class GetItemParams implements QueryLazyOptions<{ id: number }> {
    variables?: { id: number };

    constructor(id: string) {
        this.variables = { id: parseInt(id) }
    }
}

// Component
const EditForm: React.FC<RouteComponentProps<EditFormRouteParams>> = (props) => {
    const [getItem, { called, loading, error, data }] = useLazyQuery(getItemById, 
        new GetItemParams(props.match.params.id)
    )
    const prevProps = useRef(null)

    const isNewEntry = () => {
        return props.match.params.id === undefined
    }

    const getPageTitle = () => {
        return (isNewEntry() ? 'Add' : 'Edit') + ' Item'
    }

    useEffect(() => {
        if (prevProps.current === null || prevProps.current.location.pathname !== props.location.pathname) {
            if (props.match.params.id) {
                getItem(new GetItemParams(props.match.params.id))
            }
        }
        prevProps.current = props
    }, [props, getItem])

    if (called && loading) {
        return <Loading />
    }
    if (error) {
        return <Redirect to={routes.notFound.path} />
    }
    let item = data ? data.getItemById : undefined

    return (
        <>
            {
                renderIf(isNewEntry() || (!isNewEntry() && item && item.id), () => (
                    <div>
                        {/* SEO */}
                        <Helmet>
                            <title>{getPageTitle()}</title>
                        </Helmet>

                        <h1>{getPageTitle()}</h1>

                        <ItemForm item={item} />
                    </div>
                ))
            }
        </>
    )
}

export default EditForm