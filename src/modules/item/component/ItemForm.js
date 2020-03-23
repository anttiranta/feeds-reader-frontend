// Imports
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { connect } from 'react-redux'

// UI Component Imports
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// App Imports
import CategorySelector from './item_form/CategorySelector'
import {
    createIsoDateTimeFromDateAndTime,
    isoDateTimeToDateAndTime
} from '../helper/dateHelper'
import { setError, setSuccess } from '../../common/component/notification/actions'
import createItem from '../graphql/mutations/createItem'
import updateItem from '../graphql/mutations/updateItem'
import itemRoutes from '../../../setup/routes/item'
import { nullToEmptyString } from '../../../utils/stringUtils'

// Component
const ItemForm = (props) => {
    const [validated, setValidated] = useState(false);
    const [createOrUpdateItem, { loading }] = useMutation(props.item && props.item.id ? updateItem : createItem, {
        onError: (error) => {
            props.setError('We could not save the item. Please try again later.')
        },
        onCompleted: (data) => {
            props.setSuccess('Item saved successfully.')

            props.history.push(itemRoutes.showItem.path(
                props.item && props.item.id ? data.updateItem.id : data.createItem.id
            ))
        }
    })

    const { item } = props
    const [pubDate, pubTime] = item && item.pubDate ? isoDateTimeToDateAndTime(item.pubDate) : []

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const isValid = form.checkValidity()
        setValidated(true);

        if (isValid) {
            const id = parseInt(form.id.value)
            const title = form.title.value
            const description = form.description.value
            const link = form.link.value
            const pubDate = createIsoDateTimeFromDateAndTime(
                form.pubDate.value,
                form.pubTime.value
            )
            const comments = form.comments.value
            const categoryId = form.categoryId ? parseInt(form.categoryId.value) : 0

            if (id > 0) {
                createOrUpdateItem({ variables: { input: {id, title, description, link, pubDate, comments, categoryId} } })
            } else {
                createOrUpdateItem({ variables: { input: {title, description, link, pubDate, comments, categoryId} } })
            }
        }
    };

    const handleCancel = (event) => {
        event.preventDefault()
        props.history.goBack()
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Control
                defaultValue={item ? item.id : '0'}
                type="hidden"
                name="id" />

            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name="title"
                    required
                    type="text"
                    defaultValue={item ? nullToEmptyString(item.title) : ''}
                    placeholder="Enter title" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    name="description"
                    defaultValue={item ? nullToEmptyString(item.description) : ''}
                    as="textarea"
                    rows="3" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Link</Form.Label>
                <Form.Control
                    name="link"
                    type="url"
                    defaultValue={item ? nullToEmptyString(item.link) : ''}
                    placeholder="Enter URL" />
            </Form.Group>

            <>Published at<br /></>
            <Form.Row>
                <Col>
                    <Form.Control
                        type="date"
                        name="pubDate"
                        defaultValue={pubDate ? pubDate : ''}
                        required />
                </Col>
                <Col>
                    <Form.Control
                        name="pubTime"
                        type="time"
                        defaultValue={pubTime ? pubTime : ''}
                        required />
                </Col>
            </Form.Row>

            <CategorySelector item={item} />

            <Form.Group>
                <Form.Label>Comments</Form.Label>
                <Form.Control
                    name="comments"
                    type="url"
                    defaultValue={item ? nullToEmptyString(item.comments) : ''}
                    placeholder="URL to comments" />
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                disabled={loading}>
                Submit
            </Button>{' '}
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </Form>
    )
}

// Component Properties
ItemForm.propTypes = {
    item: PropTypes.object,
    setError: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired
}

export default withRouter(connect(null, { setError, setSuccess })(ItemForm))