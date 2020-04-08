// Imports
import React from 'react'

// UI Component Imports
import Pagination from 'react-bootstrap/Pagination'

// App Imports
import PaginationCounter from '../PaginationCounter'
import { renderIf } from '../../../utils/elementUtils'

// Component Properties
interface PagerProps {
    pagination: PaginationCounter;
    onPageChanged: (page: number) => void;
}

// Component
const Pager: React.FC<PagerProps> = ({ pagination, onPageChanged }) => {
    const pages = pagination.getPages()
    const hasMorePagesThanCanDisplay = pagination.getLastPageNum() > pagination.getDisplayPages()
    
    const gotoPage = (page: number) => {
        onPageChanged(page)
    }

    const handleMoveToFirst = () => {
        gotoPage(pagination.getFirstPageNum());
    }

    const handleMoveToPrevious = () => {
        gotoPage(pagination.getPreviousPageNum());
    }

    const handleMoveToNext = () => {
        gotoPage(pagination.getNextPageNum());
    }

    const handleMoveToLast = () => {
        gotoPage(pagination.getLastPageNum());
    }

    const canRender = () => {
        if (pagination.getTotalNum() === 0) {
            return false
        }
        if (pagination.getLastPageNum() > 1) {
            return true
        }
        if (pagination.getCurrentPage() > pagination.getLastPageNum()) {
            return true
        }
        return false
    }

    return (
        <>
            {
                renderIf(canRender(), () => (
                    <Pagination>
                        <Pagination.First onClick={handleMoveToFirst} />
                        {
                            pagination.isFirstPage() === false
                                ? <Pagination.Prev onClick={handleMoveToPrevious} />
                                : ''
                        }
                        {
                            renderIf(hasMorePagesThanCanDisplay && pages[0] !== pagination.getFirstPageNum(), () => (
                                <> 
                                    <Pagination.Item
                                        onClick={() => gotoPage(pagination.getFirstPageNum())} >
                                        {pagination.getFirstPageNum()}
                                    </Pagination.Item>
                                    <Pagination.Ellipsis
                                        onClick={() => gotoPage(pages[0] - 1)}/>
                                </>
                            ))
                        }
                        {pages.map(page =>
                            pagination.isPageCurrent(page) === true
                                ? <Pagination.Item 
                                    onClick={() => gotoPage(page)} 
                                    key={'page-' + page} 
                                    active>
                                        {page}
                                    </Pagination.Item>
                                : <Pagination.Item 
                                    onClick={() => gotoPage(page)} 
                                    key={'page-' + page}>
                                        {page}
                                    </Pagination.Item>
                        )}
                        {
                            renderIf(hasMorePagesThanCanDisplay && pages[pages.length-1] !== pagination.getLastPageNum(), () => ( 
                                <>
                                    <Pagination.Ellipsis
                                        onClick={() => gotoPage(pages[pages.length-1] + 1)}/>
                                    <Pagination.Item
                                        onClick={() => gotoPage(pagination.getLastPageNum())} >
                                        {pagination.getLastPageNum()}
                                    </Pagination.Item>
                                </>
                            ))
                        }
                        {
                            pagination.isLastPage() === false
                                ? <Pagination.Next onClick={handleMoveToNext} />
                                : ''
                        }
                        <Pagination.Last onClick={handleMoveToLast} />
                    </Pagination>
                ))
            }
        </>
    )
}

export default Pager