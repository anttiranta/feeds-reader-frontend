// Imports
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

// UI Component Imports
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

// App Imports
import useInput from '../../../../hooks/useInput'
import { updateQueryConditions } from '../../redux/item/list/actions'
import { duplicate } from '../../helper/urlSearchParams'
import { setError } from '../../../common/component/notification/actions'

const SearchForm = (props) => {
    const title = props.itemListQuery.urlSearchParams.has('title')
        ? props.itemListQuery.urlSearchParams.get('title')
        : ''
    const titleInput = useInput('text', title)

    const handleStartSearch = () => {
        const title = titleInput.value

        let newParams = duplicate(props.itemListQuery.urlSearchParams)
        if (title === '' && newParams.has('title')) {
            newParams.delete('title') // clear search params
        } else {
            newParams.set('title', title)
        }

        props.updateQueryConditions(newParams)
    }

    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    {...titleInput}
                    name="title"
                    placeholder="Search items"
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

// Component State
function searchFormStates(state) {
    return {
        itemListQuery: state.itemListQuery,
    }
}

// Component Properties
SearchForm.propTypes = {
    itemListQuery: PropTypes.object.isRequired,
    updateQueryConditions: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
}

export default connect(searchFormStates, { 
    setError, 
    updateQueryConditions 
})(SearchForm);