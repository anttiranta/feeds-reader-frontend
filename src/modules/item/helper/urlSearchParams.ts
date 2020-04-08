export function duplicate(
    urlSearchParams: URLSearchParams
): URLSearchParams {
    let newParams = new URLSearchParams()
    
    for(var pair of urlSearchParams.entries()) {
        newParams.set(pair[0], pair[1]) 
    }

    return newParams
}

export function isSame(
    a: URLSearchParams,
    b: URLSearchParams
): boolean {
    if (a === null && b === null) {
        return true
    }
    if (a.toString() === b.toString()) {
        return true
    }
    return false
}