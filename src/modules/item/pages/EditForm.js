// Imports
import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useLazyQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'

// App Imports
import ItemForm from '../component/ItemForm'
import Loading from '../../common/component/Loading';
import getItemById from '../graphql/queries/getItemById'
import { renderIf } from '../../../utils/elementUtils'
import { routes } from '../../../setup/routes'

const EditForm = (props) => {
    const [getItem, { called, loading, error, data }] = useLazyQuery(getItemById, {
        variables: { id: props.match.params.id }
    })
    const prevProps = useRef(false)

    const isNewEntry = () => {
        return props.match.params.id === undefined
    }

    const getPageTitle = () => {
        return (isNewEntry() ? 'Add' : 'Edit') + ' Item'
    }

    useEffect(() => {
        if (!prevProps.current || prevProps.current.location.pathname !== props.location.pathname) {
            if (props.match.params.id) {
                getItem(props.match.params.id)
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