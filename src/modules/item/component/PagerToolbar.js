// Imports
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import Pager from '../../common/component/Pager';
import Limiter from '../../common/component/Limiter';
import { updateQueryConditions } from '../redux/item/list/actions'
import { duplicate } from '../helper/urlSearchParams'
import { setError } from '../../common/component/notification/actions'

const PagerToolbar = (props) => {
    const pagination = props.pagination

    const onPageChanged = (page) => {
        if (props.itemListQuery.urlSearchParams) {
            let newParams = duplicate(props.itemListQuery.urlSearchParams)
            newParams.set('p', page)

            props.updateQueryConditions(newParams)
        }
    }

    const onLimitChanged = (limit) => {
        if (props.itemListQuery.urlSearchParams) {
            let newParams = duplicate(props.itemListQuery.urlSearchParams)
            newParams.set('limit', limit)

            props.updateQueryConditions(newParams)
        }
    }

    return (
        <>
            <div style={{ float: 'left' }}>
                <Limiter pagination={pagination} onLimitChanged={(limit) => onLimitChanged(limit)} />
            </div>
            <div style={{ float: 'right' }}>
                <Pager pagination={pagination} onPageChanged={(page) => onPageChanged(page)} />
            </div>
        </>
    )
}

// Component State
function pagerToolbarStates(state) {
    return {
        itemListQuery: state.itemListQuery,
    }
}

// Component Properties
PagerToolbar.propTypes = {
    itemListQuery: PropTypes.object.isRequired,
    updateQueryConditions: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
}

export default connect(pagerToolbarStates, { 
    setError, 
    updateQueryConditions 
})(PagerToolbar);