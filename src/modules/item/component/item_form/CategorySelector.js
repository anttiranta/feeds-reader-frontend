// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

// UI Component Imports
import Form from 'react-bootstrap/Form'

// App Imports
import Loading from '../../../common/component/Loading';
import getAllCategories from '../../graphql/queries/getAllCategories'
import { renderIf } from '../../../../utils/elementUtils'

const CategorySelector = (props) => {
    const { loading, error, data } = useQuery(getAllCategories)
    const { item } = props

    const renderLoader = () => (
        <>
            <br />
            <Loading variant={'secondary'} />
        </>
    )

    let categories = undefined
    if (!loading && !error) {
        categories = data ? data.categories.categories : undefined
    }

    return (
        <Form.Group>
            <Form.Label>Category</Form.Label>
            {
                loading
                    ? renderLoader()
                    : <Form.Control 
                        as="select" 
                        name="categoryId" 
                        defaultValue={item && item.category ? item.category.id : 0}>
                        <option value="0">Choose...</option>
                        {
                            renderIf(categories, () => (
                                <>
                                    {categories.map(category =>
                                        <option
                                            key={category.id}
                                            value={category.id}>
                                            {category.name}
                                        </option>
                                    )}
                                </>
                            ))
                        }
                    </Form.Control>
            }
        </Form.Group>
    )
}

// Component Properties
CategorySelector.propTypes = {
    item: PropTypes.object
}

export default CategorySelector