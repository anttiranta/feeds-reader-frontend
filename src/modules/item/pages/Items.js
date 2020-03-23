// Imports
import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useLazyQuery } from '@apollo/react-hooks';

// App Imports
import List from '../component/List'
import Toolbar from '../component/toolbar/Toolbar'
import PagerToolbar from '../component/PagerToolbar'
import PaginationCounter from '../../common/PaginationCounter';
import Loading from '../../common/component/Loading';
import { setError } from '../../common/component/notification/actions'
import { renderIf } from '../../../utils/elementUtils'
import { 
  getGqlVariablesFromURLSearchParams 
} from '../helper/urlSearchParams'
import getPaginatedList from '../graphql/queries/getPaginatedList'

const Items = (props) => {
  const prevProps = useRef(false)
  const [getItems, { loading, data }] = useLazyQuery(getPaginatedList, {
    variables: getGqlVariablesFromURLSearchParams(props.itemListQuery.urlSearchParams),
    onError: (error) => {
      props.setError('There was some error searching the data. Please try again.')
    },
    fetchPolicy: 'no-cache' // probably the only way to do this with graphql and apollo...
  });

  useEffect(() => {
    if (!prevProps.current 
      || prevProps.current.location.pathname !== props.location.pathname
      || prevProps.current.itemListQuery.version < props.itemListQuery.version) 
    {
      if (props.itemListQuery.urlSearchParams) {
        getItems(props.itemListQuery.urlSearchParams)
      }
    }
    prevProps.current = props
  }, [props, getItems])

  let { urlSearchParams } = props.itemListQuery

  let items = data ? data.items.items : []
  let totalRecordsCount = data ? data.items.totalCount : 0

  return (
    <div>
      {/* SEO */}
      <Helmet>
        <title>Items</title>
      </Helmet>

      {
        loading
          ? <Loading />
          : <>
            {/* Content */}
            <h1>Items</h1>

            <Toolbar />
            <List items={items} />

            {/* Pagination & limiter */}
            {
              renderIf(items, () => (
                <PagerToolbar pagination={new PaginationCounter(items.length, totalRecordsCount, urlSearchParams)} />
              ))
            }
          </>
      }
    </div >
  )
}

// Component State
function itemsStates(state) {
  return {
    itemListQuery: state.itemListQuery,
  }
}

// Component Properties
Items.propTypes = {
  itemListQuery: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired
}

export default connect(itemsStates, { setError })(Items);