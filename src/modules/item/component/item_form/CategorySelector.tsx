// Imports
import React from 'react'
import { useQuery } from '@apollo/react-hooks'

// UI Component Imports
import Form from 'react-bootstrap/Form'

// App Imports
import Loading from '../../../common/component/Loading';
import getAllCategories from '../../graphql/queries/getAllCategories'
import { renderIf } from '../../../../utils/elementUtils'
import ItemInterface from '../../types/ItemInterface';
import CategoryInterface from '../../types/CategoryInterface';

// Component Properties
interface CategorySelectorProps {
    item: ItemInterface
}

// Component
const CategorySelector: React.FC<CategorySelectorProps> = (props) => {
    const { loading, error, data } = useQuery(getAllCategories)
    const { item } = props

    const renderLoader = () => (
        <>
            <br />
            <Loading variant={'secondary'} />
        </>
    )

    let categories: CategoryInterface[] = []
    if (!loading && !error) {
        categories = data ? data.categories.categories : []
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
                            renderIf(categories.length > 0, () => (
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

export default CategorySelector