// Imports
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

// App Imports
import Pager from './Pager'
import PaginationCounter from '../PaginationCounter';
import buildURLSearchParams from '../UrlSearchParamsBuilder'

// Constants
const PAGER_BTN_SELECTOR = '.page-item'

/**
 * Test 6/5 so there is 5 on 1st page and 1 on 2nd page
 */
test('Test renders 2 pages and other buttons', () => {
    const total = 6
    const perPage = 5
    const currentPage = 2

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    const component = render(
        <Pager pagination={pagination} onPageChanged={(page) => console.log('Changed to page ' + page)} />
    )

    const nodes = component.container.querySelectorAll(PAGER_BTN_SELECTOR)

    const firstAndLastPageButtons = 2
    const pageButtons = 2
    const previousPageBtn = 1

    expect(nodes.length).toBe(firstAndLastPageButtons + pageButtons + previousPageBtn)
})

/**
 * Test 15/5 so there is 5 on each page
 */
test('Test renders 3 pages and other buttons', () => {
    const total = 15
    const perPage = 5
    const currentPage = 2

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    const component = render(
        <Pager pagination={pagination} onPageChanged={(page) => console.log('Changed to page ' + page)} />
    )

    const nodes = component.container.querySelectorAll(PAGER_BTN_SELECTOR)
    
    const firstAndLastPageButtons = 2
    const pageButtons = 3
    const previousAndNextPageButtons = 2

    expect(nodes.length).toBe(firstAndLastPageButtons + pageButtons + previousAndNextPageButtons)
})

/**
 * Test 100/5 so there is lot of pages and ellipsis buttons should show
 */
test('Test renders ellipsis buttons', () => {
    const total = 100
    const perPage = 5
    let currentPage = 14

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    const component = render(
        <Pager pagination={pagination} onPageChanged={(page) => console.log('Changed to page ' + page)} />
    )

    const nodes = component.container.querySelectorAll(PAGER_BTN_SELECTOR)
    
    const firstAndLastPageButtons = 2
    const previousAndNextPageButtons = 2
    const ellipsisButtons = 2
    const pageButtons = 5 + 2 // page 1 and 20 buttons should also show
    
    expect(nodes.length).toBe(
        firstAndLastPageButtons + pageButtons + ellipsisButtons + previousAndNextPageButtons
    )
})

/**
 * Test that pagination works correctly in case where last page has one record, 
 * and user deletes the record. 
 */
test('Test pagination when page size is zero and current page is not first page', () => {
    const total = 5
    const perPage = 5
    const currentPage = 2

    const pagination = new PaginationCounter(0, total, buildURLSearchParams(currentPage, perPage))

    const component = render(
        <Pager pagination={pagination} onPageChanged={(page) => console.log('Changed to page ' + page)} />
    )

    const nodes = component.container.querySelectorAll(PAGER_BTN_SELECTOR)
    
    const firstAndLastPageButtons = 2
    const prevPageBtn = 1
    const pageButtons = 1
    
    expect(nodes.length).toBe(firstAndLastPageButtons + prevPageBtn + pageButtons)
})

/**
 * Test that pager component won't render when there is no reason to show it
 */
test('Test should not render', () => {
    const total = 4
    const perPage = 5
    const currentPage = 1

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    const component = render(
        <Pager pagination={pagination} onPageChanged={(page) => console.log('Changed to page ' + page)} />
    )

    const nodes = component.container.querySelectorAll(PAGER_BTN_SELECTOR)
    expect(nodes.length).toBe(0)
})