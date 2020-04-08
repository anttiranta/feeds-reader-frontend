const KEY_PAGE_SIZE = 'limit'
const KEY_CURRENT_PAGE = 'p'
const KEY_SEARCH_FOR = 'searchFor'
const KEY_SEARCH_WORD = 'searchWord'

export interface GqlVariables {
    [key: string]: object | number | string | boolean
}

export function buildGqlVariables(urlSearchParams: URLSearchParams): GqlVariables {
    let variables: GqlVariables = {}

    if (urlSearchParams.has(KEY_SEARCH_FOR) && urlSearchParams.has(KEY_SEARCH_WORD)) {
        let key = urlSearchParams.get(KEY_SEARCH_FOR)
        let value = urlSearchParams.get(KEY_SEARCH_WORD)

        if (key !== '' && value !== '') {
            variables['filter'] = {[key]: {like: value}}
        }
    }
    if (urlSearchParams.has(KEY_PAGE_SIZE)) {
        variables[KEY_PAGE_SIZE] = parseInt(urlSearchParams.get(KEY_PAGE_SIZE))
    }
    if (urlSearchParams.has(KEY_CURRENT_PAGE)) {
        variables[KEY_CURRENT_PAGE] = parseInt(urlSearchParams.get(KEY_CURRENT_PAGE))
    }
    return variables
}