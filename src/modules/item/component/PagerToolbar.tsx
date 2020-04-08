// Imports
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

// App Imports
import PaginationCounter from '../../common/PaginationCounter';
import Pager from '../../common/component/Pager';
import Limiter from '../../common/component/Limiter';
import { updateQueryConditions } from '../redux/item/list/actions'
import { duplicate } from '../helper/urlSearchParams'
import { setError } from '../../common/component/notification/redux/actions'
import { ItemListQueryState } from '../redux/item/list/types'

// Component State
function pagerToolbarStates (state: { itemListQuery: ItemListQueryState }) {
    return {
        itemListQuery: state.itemListQuery
    }
}

const connector = connect(pagerToolbarStates, { setError, updateQueryConditions })

// Component Properties
type PropsFromRedux = ConnectedProps<typeof connector>
type PagerToolbarProps = PropsFromRedux & {
    pagination: PaginationCounter
}

// Component
const PagerToolbar: React.FC<PagerToolbarProps> = (props) => {
    const pagination = props.pagination

    const onPageChanged = (page: number) => {
        if (props.itemListQuery.urlSearchParams) {
            let newParams = duplicate(props.itemListQuery.urlSearchParams)
            newParams.set('p', page.toString())

            props.updateQueryConditions(newParams)
        }
    }

    const onLimitChanged = (limit: number) => {
        if (props.itemListQuery.urlSearchParams) {
            let newParams = duplicate(props.itemListQuery.urlSearchParams)
            newParams.set('limit', limit.toString())

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

export default connector(PagerToolbar)