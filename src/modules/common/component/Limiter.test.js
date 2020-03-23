// Imports
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

// App Imports
import Limiter from './Limiter'
import PaginationCounter from '../PaginationCounter';
import buildURLSearchParams from '../UrlSearchParamsBuilder'

test('Test renders limits: 5, 10, 20, 50', () => {
    const total = 6
    const perPage = 5
    const currentPage = 1

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    const component = render(
        <Limiter pagination={pagination} onLimitChanged={(limit) => console.log('Changed to limit ' + limit)} />
    )

    const options = component.getAllByRole('option')
    expect(options.length).toBe(4)

    const expectedLimits = [5, 10, 20, 50]
    options.forEach(option =>
        expect(expectedLimits).toContain(parseInt(option.textContent))
    )

    expect(options[0].selected).toBeTruthy()
})

test('Test correct limit is selected', () => {
    const total = 100
    const perPage = 20
    const currentPage = 3

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    const component = render(
        <Limiter pagination={pagination} onLimitChanged={(limit) => console.log('Changed to limit ' + limit)} />
    )

    const options = component.getAllByRole('option')
    expect(options[2].selected).toBeTruthy()
})

/**
 * Test that limiter component won't render when there is no reason to show it
 */
test('Test should not render', () => {
    const total = 0
    const perPage = 5
    const currentPage = 1

    const pagination = new PaginationCounter(perPage, total, buildURLSearchParams(currentPage, perPage))

    const component = render(
        <Limiter pagination={pagination} onLimitChanged={(limit) => console.log('Changed to limit ' + limit)} />
    )

    const options = component.findAllByRole('option')
    const optionsCount = Array.isArray(options) ? options.length : 0

    expect(optionsCount).toBe(0)
})