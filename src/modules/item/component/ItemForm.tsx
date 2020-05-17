// Imports
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

// UI Component Imports
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// App Imports
import CategorySelector from './item_form/CategorySelector'
import { setError, setSuccess } from '../../common/component/notification/redux/actions'
import { nullToEmptyString } from '../../../utils/stringUtils'
import itemRoutes from '../../../setup/routes/item'
import useItemForm from '../hooks/useItemForm'
import createItem from '../graphql/mutations/createItem'
import updateItem from '../graphql/mutations/updateItem'
import ItemInteface from '../types/ItemInterface'

const connector = connect(null, { setError, setSuccess })

// Component Properties
type PropsFromRedux = ConnectedProps<typeof connector>
type ItemFormProps = PropsFromRedux & RouteComponentProps & {
    item?: ItemInteface,
}

// Component
const ItemForm: React.FC<ItemFormProps> = (props) => {
    const { item } = props
    const createOrUpdateItemMutation = item && item.id ? updateItem : createItem

    const onError = () => {
        props.setError('We could not save the item. Please try again later.')
    }

    const onSuccess = (id: number) => {
        props.setSuccess('Item saved successfully.')
        props.history.push(itemRoutes.showItem.path(id))
    }

    const ifProps = useItemForm({ ...props, createOrUpdateItemMutation, onError, onSuccess })
    const { handleCancel, handleSubmit, getItemPubDateValues, isLoading, isValidated } = ifProps;

    const [pubDate, pubTime, pubTZ] = getItemPubDateValues(item)

    return (
        <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
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

            {/* Hidden timezone input */}
            <Form.Control
                name="pubTimeZone"
                type="hidden"
                defaultValue={pubTZ ? pubTZ : '+00:00'}
                required />

            {/* Category selector */}
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
                disabled={isLoading}>
                Submit
            </Button>{' '}
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </Form>
    )
}

export default withRouter(connector(ItemForm))