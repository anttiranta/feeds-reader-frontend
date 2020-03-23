// Date helper

export function createIsoDateTimeFromDateAndTime(date, time) {
    return date + ' ' + time // TODO: timezone?
}

export function isoDateTimeToDateAndTime(isoDateTime) {
    // TODO: refactor to be more secure, return empty array if fails
    return isoDateTime.split(' ', 2) // TODO: timezone?
}