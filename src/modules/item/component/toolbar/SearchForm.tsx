// Imports
import React, { useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'

// UI Component Imports
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// App Imports
import useInput from '../../../../hooks/useInput'
import useInputWithCallback from '../../../../hooks/useInputWithCallback'
import { updateQueryConditions } from '../../redux/item/list/actions'
import { duplicate } from '../../helper/urlSearchParams'
import { setError } from '../../../common/component/notification/redux/actions'
import { ItemListQueryState } from '../../redux/item/list/types'

// Component State
function searchFormStates (state: { itemListQuery: ItemListQueryState }) {
    return {
        itemListQuery: state.itemListQuery
    }
}

const connector = connect(searchFormStates, { setError, updateQueryConditions })

// Component Properties
type PropsFromRedux = ConnectedProps<typeof connector>

// Component
const SearchForm: React.FC<PropsFromRedux> = (props) => {
    const searchFor = props.itemListQuery.urlSearchParams.has('searchFor')
        ? props.itemListQuery.urlSearchParams.get('searchFor')
        : 'title'
    const searchWord = props.itemListQuery.urlSearchParams.has('searchWord')
        ? props.itemListQuery.urlSearchParams.get('searchWord')
        : ''
    const swInputRef = useRef(null);
    const searchWordInput = useInput('text', searchWord)
    const searchForSelect = useInputWithCallback('select', searchFor, value => {
        if (swInputRef.current) {
            swInputRef.current.focus()
        }
    })

    const handleStartSearch = () => {
        let newParams = duplicate(props.itemListQuery.urlSearchParams)

        if (searchWordInput.value === '' && newParams.has('searchWord')) {
            // clear search params
            newParams.delete('searchFor') 
            newParams.delete('searchWord')
        } else {
            newParams.set('searchFor', searchForSelect.value)
            newParams.set('searchWord', searchWordInput.value)
        }

        props.updateQueryConditions(newParams)
    }

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control 
                    {...searchForSelect}
                    as="select">
                    <option value="title">Title</option>
                    <option value="categoryName">Category</option>
                </Form.Control>

                <FormControl
                    ref={swInputRef}
                    {...searchWordInput}
                    name="searchWord"
                    aria-describedby="basic-addon1" />

                <InputGroup.Append>
                    <Button
                        onClick={handleStartSearch}
                        variant="outline-primary">
                        Search
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </>
    )
}

export default connector(SearchForm)