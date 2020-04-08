// Imports
import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { connect, ConnectedProps } from 'react-redux'
import { useLazyQuery, QueryLazyOptions } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom'

// App Imports
import List from '../component/List'
import Toolbar from '../component/toolbar/Toolbar'
import PagerToolbar from '../component/PagerToolbar'
import PaginationCounter from '../../common/PaginationCounter';
import Loading from '../../common/component/Loading';
import { setError } from '../../common/component/notification/redux/actions'
import { renderIf } from '../../../utils/elementUtils'
import { 
  GqlVariables, 
  buildGqlVariables 
} from '../graphql/queries/item_list/inputBuilder'
import { isSame } from '../helper/urlSearchParams'
import getItemList from '../graphql/queries/getItemList'
import { ItemListQueryState } from '../redux/item/list/types'

// Component State
function itemsStates (state: { itemListQuery: ItemListQueryState }) {
  return {
      itemListQuery: state.itemListQuery
  }
}

const connector = connect(itemsStates, { setError })

// Component Properties
class GetItemListParams implements QueryLazyOptions<GqlVariables> {
  variables?: GqlVariables;

  constructor(urlSearchParams: URLSearchParams) {
      this.variables = buildGqlVariables(urlSearchParams)
  }

  getVariables(): GqlVariables {
    return this.variables
  }
}
type PropsFromRedux = ConnectedProps<typeof connector>
type ItemsProps = RouteComponentProps & PropsFromRedux & GetItemListParams

// Component
const Items: React.FC<ItemsProps> = (props) => {
  const prevProps = useRef(null)
  const [getItems, { loading, data }] = useLazyQuery(getItemList, {
    variables: buildGqlVariables(props.itemListQuery.urlSearchParams),
    onError: (error) => {
      props.setError('There was some error searching the data. Please try again.')
    },
    fetchPolicy: 'no-cache' // probably the only way to do this with graphql and apollo...
  });

  useEffect(() => {
    if (prevProps.current === null
      || prevProps.current.location.pathname !== props.location.pathname
      || prevProps.current.itemListQuery.version < props.itemListQuery.version
      || !isSame(prevProps.current.itemListQuery.urlSearchParams, props.itemListQuery.urlSearchParams)
    ) {
      getItems(new GetItemListParams(props.itemListQuery.urlSearchParams))

      prevProps.current = props
    }
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

export default connector(Items)