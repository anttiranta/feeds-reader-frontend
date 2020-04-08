// Imports
import React from 'react'

// UI Component Imports
import Form from 'react-bootstrap/Form'

// App Imports
import PaginationCounter from '../PaginationCounter'
import { renderIf } from '../../../utils/elementUtils'

// Component Properties
interface LimiterProps {
    pagination: PaginationCounter;
    onLimitChanged: (limit: number) => void;
}

// Component
const Limiter: React.FC<LimiterProps> = ({ pagination, onLimitChanged }) => {
    const changeLimit = (event: React.BaseSyntheticEvent) => {
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

export default Limiter