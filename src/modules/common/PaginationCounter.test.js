// App Imports
import PaginationCounter from './PaginationCounter';
import buildURLSearchParams from './UrlSearchParamsBuilder'

test('Test getFirstNum', () => {
    const total = 15
    const perPage = 5
    let currentPage = 1

    let pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    expect(pagination.getFirstNum()).toBe(1)

    currentPage = 2
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    expect(pagination.getFirstNum()).toBe(6)

    currentPage = 3
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    expect(pagination.getFirstNum()).toBe(11)
})

test('Test getLastNum', () => {
    const total = 15
    const perPage = 5
    let currentPage = 1

    let pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    expect(pagination.getLastNum()).toBe(5)

    currentPage = 2
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    expect(pagination.getLastNum()).toBe(10)

    currentPage = 3
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    expect(pagination.getLastNum()).toBe(15)
})

/**
 * Test 15/5 so there's still 15, 5 per 3 pages
 */
test('Test pagination without rounding', () => {
    const total = 15
    const perPage = 5
    const currentPage = 1

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getLastPageNum()).toBe(3)
    expect(pagination.getCurrentPage()).toBe(1)
    expect(pagination.getNextPageNum()).toBe(2)
})

/**
 * Test 15/4 so there's still 15, 4 per 4 pages
 */
test('Test pagination with rounding', () => {
    const total = 15
    const perPage = 4
    const currentPage = 1

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    const pages = pagination.getPages()

    expect(pagination.getLastPageNum()).toBe(4)
    expect(pages.length).toBe(4)

    const expectedPages = [1, 2, 3, 4]
    expectedPages.forEach(i =>
        expect(pages).toContain(i)
    )
})

/**
 * Test 100/34
 */
test('Test pagination with rounding and bigger values', () => {
    const total = 100
    const perPage = 34
    const currentPage = 1

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    const pages = pagination.getPages()

    expect(pagination.getLastPageNum()).toBe(3)
    expect(pages.length).toBe(3)

    const expectedPages = [1, 2, 3];
    expectedPages.forEach(i =>
        expect(pages).toContain(i)
    )
})

/**
 * Test 15/20 so there's still 15, 20 per 1 pages
 */
test('Test pagination limit bigger than total number of records', () => {
    const total = 15
    const perPage = 20
    const currentPage = 1

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    const pages = pagination.getPages()

    expect(pagination.getLastPageNum()).toBe(1)
    expect(pages.length).toBe(1)

    const expectedPages = [1]
    expectedPages.forEach(i =>
        expect(pages).toContain(i)
    )
})

/**
 * Test that current page, next page and prev page work,  
 * so there's still 15, 5 per 3 pages
 */
test('Test current, next and previous page', () => {
    const total = 15
    const perPage = 5
    let currentPage = 1

    let pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getCurrentPage()).toBe(1)
    expect(pagination.getNextPageNum()).toBe(2)
    expect(pagination.getPreviousPageNum()).toBe(0)
    expect(pagination.isFirstPage()).toBeTruthy()

    currentPage = 2
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getCurrentPage()).toBe(2)
    expect(pagination.getNextPageNum()).toBe(3)
    expect(pagination.getPreviousPageNum()).toBe(1)
    expect(pagination.isLastPage()).toBeFalsy();
    expect(pagination.isFirstPage()).toBeFalsy();

    currentPage = 3
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getCurrentPage()).toBe(3)
    expect(pagination.getNextPageNum()).toBe(4)
    expect(pagination.isLastPage()).toBeTruthy()
    expect(pagination.getPreviousPageNum()).toBe(2)

    const pages = pagination.getPages()
    const expectedPages = [1, 2, 3]
    expectedPages.forEach(i =>
        expect(pages).toContain(i)
    )
})

test('Test isCurrentPage', () => {
    const total = 15
    const perPage = 5
    let currentPage = 1

    let pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.isPageCurrent(1)).toBeTruthy()
    expect(pagination.isPageCurrent(2)).toBeFalsy()

    currentPage = 2
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.isPageCurrent(2)).toBeTruthy()
    expect(pagination.isPageCurrent(1)).toBeFalsy()
    expect(pagination.isPageCurrent(3)).toBeFalsy()

    currentPage = 3
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.isPageCurrent(3)).toBeTruthy()
    expect(pagination.isPageCurrent(2)).toBeFalsy()
})

/**
 * Test that last page counting works, 
 * both without and with rounding
 */
test('Test last page', () => {
    const total = 100
    const currentPage = 1
    let perPage = 10

    let pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getLastPageNum()).toBe(10)

    perPage = 6
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getLastPageNum()).toBe(17)
})

test('Test last page with odd total sum of records', () => {
    const total = 6
    const perPage = 5
    let currentPage = 1

    let pagination = new PaginationCounter(5, total, buildURLSearchParams(currentPage, perPage))
    expect(pagination.getLastPageNum()).toBe(2)

    currentPage = 2

    pagination = new PaginationCounter(1, total, buildURLSearchParams(currentPage, perPage))
    expect(pagination.getLastPageNum()).toBe(2)
})

/**
 * Test pages is a range list of possible pages. 
 * Try 201 with 100 per page = 3 pages
 */
test('Test getPages returns list', () => {
    const total = 201
    const currentPage = 1
    const perPage = 100

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    const pages = pagination.getPages()

    expect(pagination.getLastPageNum()).toBe(3)
    expect(pages.length).toBe(3)

    const expectedPages = [1, 2, 3]
    expectedPages.forEach(i =>
        expect(pages).toContain(i)
    )
    expect(pages).not.toContain(4)
})

/**
 * By default, max number of pages is five (5).
 * Test that only 5 pages are returned even when more exist,  
 * and that last page num is still greater than 5. 
 */
test('Test pagination returns only allowed number of pages', () => {
    const total = 100
    const currentPage = 1
    const perPage = 3

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    const pages = pagination.getPages()

    expect(pagination.getLastPageNum()).toBe(34)
    expect(pages.length).toBe(5)

    const expectedPages = [1, 2, 3, 4, 5];
    expectedPages.forEach(i =>
        expect(pages).toContain(i)
    )

    const nonIncludedPages = [6, 15, 30];
    nonIncludedPages.forEach(i =>
        expect(pages).not.toContain(i)
    )
})

test('Test pagination with current page in the middle of list', () => {
    const total = 100
    const perPage = 5
    let currentPage = 12

    let pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    let pages = pagination.getPages()

    expect(pagination.getFirstPageNum()).toBe(1)
    expect(pagination.getLastPageNum()).toBe(20)
    expect(pagination.getPreviousPageNum()).toBe(11)
    expect(pagination.getNextPageNum()).toBe(13)
    expect(pages.length).toBe(5)

    const expectedPages = [10, 11, 12, 13, 14];
    expectedPages.forEach(i =>
        expect(pages).toContain(i)
    )
})

test('Test pagination with current page near the end of list', () => {
    const total = 100
    const perPage = 5
    let currentPage = 14

    let pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    let pages = pagination.getPages()

    let expectedPages = [12, 13, 14, 15, 16];
    expectedPages.forEach(i =>
        expect(pages).toContain(i)
    )

    currentPage = 18
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    pages = pagination.getPages()

    expectedPages = [16,17,18,19,20];
    expectedPages.forEach(i =>
        expect(pages).toContain(i)
    )
})

/**
 * Test that limiting works
 */
test('Test limiting with allowed limits', () => {
    const total = 100
    const currentPage = 1
    let perPage = 10

    let pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getLimit()).toBe(10)

    perPage = 20
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getLimit()).toBe(20)
})

/**
 * Test that user can't set limit different that what we allow
 */
test('Test limiting with limits bigger than allowed', () => {
    const total = 100
    const currentPage = 1
    let perPage = 34

    let pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getLimit()).toBe(5)

    perPage = 60
    pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    expect(pagination.getLimit()).toBe(5)
})

test('Test invalid current page', () => {
    const total = 100
    const perPage = 5
    const currentPage = 21

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))
    expect(pagination.getCurrentPage()).toBe(21)
})

/**
 * Test that pagination works correctly in case where last page has one record, 
 * and user deletes the record. 
 */
test('Test pagination when page size is zero and current page is not first page', () => {
    const total = 5
    const perPage = 5
    const currentPage = 2
    const pageSize = 0

    const pagination = new PaginationCounter(pageSize, total, buildURLSearchParams(currentPage, perPage))
    const pages = pagination.getPages()

    expect(pagination.getLastPageNum()).toBe(1)
    expect(pages.length).toBe(1)
    expect(pagination.getTotalNum()).toBe(5)
})