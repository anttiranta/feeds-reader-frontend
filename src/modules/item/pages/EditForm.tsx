// Imports
import React from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'

// App Imports
import ItemForm from '../component/ItemForm'
import Loading from '../../common/component/Loading';
import getItemById from '../graphql/queries/getItemById'
import { renderIf } from '../../../utils/elementUtils'
import { routes } from '../../../setup/routes'
import useEditForm from '../hooks/useEditForm'
import EditFormProps from '../types/item/form/EditFormProps'

// Component
const EditForm: React.FC<EditFormProps> = (props) => {
    const efProps = useEditForm({ ...props, getItemQuery: getItemById })
    const { item, isNewEntry, hasError, isLoading, fetchCalled } = efProps;

    const getPageTitle = () => {
        return (isNewEntry() ? 'Add' : 'Edit') + ' Item'
    }

    if (fetchCalled && isLoading) {
        return <Loading />
    }
    if (hasError) {
        return <Redirect to={routes.notFound.path} />
    }

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