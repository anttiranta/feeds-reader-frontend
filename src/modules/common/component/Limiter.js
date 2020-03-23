// Imports
import React from 'react'
import PropTypes from 'prop-types'

// UI Component Imports
import Form from 'react-bootstrap/Form'

// App Imports
import { renderIf } from '../../../utils/elementUtils'

const Limiter = ({ pagination, onLimitChanged }) => {
    const changeLimit = (event) => {
        onLimitChanged(event.target.value)
    }

    return (
        <>
            {
                renderIf(pagination.getTotalNum() > 0, () => (
                    <div className="limiter">
                        <Form.Group>
                            <Form.Control
                                as="select"
                                style={{ width: 'inherit' }}
                                onChange={changeLimit}
                                defaultValue={pagination.getLimit()}>
                                {pagination.getAvailableLimit().map(limit =>
                                    <option
                                        key={'limit-' + limit}
                                        value={limit}>
                                        {limit}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </div>
                ))
            }
        </>
    )
}

// Component Properties
Limiter.propTypes = {
    pagination: PropTypes.object.isRequired,
    onLimitChanged: PropTypes.func.isRequired
}

export default Limiter