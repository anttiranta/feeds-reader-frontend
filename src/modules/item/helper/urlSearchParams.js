export function duplicate(urlSearchParams) {
    let newParams = new URLSearchParams()
    for(var pair of urlSearchParams.entries()) {
        newParams.set(pair[0], pair[1]) 
    }

    return newParams
}

export function getGqlVariablesFromURLSearchParams(urlSearchParams) {
    let variables = {}
    for(let pair of urlSearchParams.entries()) {
        let key = pair[0]
        let value = pair[1]

        if (['limit', 'p'].includes(key)) {
            value = parseInt(value)
        }
        variables[key] = value
    }

    return variables
}