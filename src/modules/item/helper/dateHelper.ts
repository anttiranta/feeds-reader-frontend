/**
 * Combines separate date, time and timezone data into a ISO 8601 datetime string.
 * 
 * @param {string} date Date in format 2020-04-07
 * @param {string} time Time in format 07:27:29
 * @param {string} timezone Timezone in format 00:00
 * @return {string} Datetime in ISO 8601 format (2020-04-07T07:27:29+00:00)
 */
export function createIsoDateTimeFromDateAndTime(
    date: string, 
    time: string,
    timezone: string
): string {
    const tzSeparator = timezone.substring(0, 1)
    if (['+', '-'].includes(tzSeparator) === false) {
        throw new Error('Invalid timezone value supplied as paramater.')
    }

    const dateParts: number[] = date.split('-', 3).map(part => parseInt(part))
    const timeParts: number[] = time.split(':', 3).map(part => parseInt(part))
    const tzParts: number[] = timezone.split(':', 2).map(part => parseInt(part))

    const [year, month, day] = dateParts
    const [hours, minutes, seconds] = timeParts
    const [tzHours, tzMinutes] = tzParts

    validateDate(year, month, day)
    validateTime(hours, minutes, seconds)
    validateTime(tzHours, tzMinutes)

    return getYearMonthAndDay(dateParts).join('-') + 'T'
     + getHoursMinutesAndSeconds(timeParts).join(':') 
     + tzSeparator + getHoursMinutesAndSeconds(tzParts).join(':')
}

/**
 * Splits ISO 8601 datetime string into separate parts containing date, time and timezone data.
 * 
 * @param {string} isoDateTime Datetime in ISO 8601 format (2020-04-07T07:27:29+00:00)
 * @return {array}
 */
export function isoDateTimeToDateAndTime(
    isoDateTime: string
): string[] {
    let result: string[] = []

    const tzSeparator = isoDateTime.substring(19, 20)
    if (['+', '-'].includes(tzSeparator) === false) {
        throw new Error('Invalid datetime supplied as paramater.')
    }

    const parts = splitTimeValue(isoDateTime, 'T', 2)
    const parts2 = splitTimeValue(parts[1], tzSeparator, 2) 

    const dateParts = parts[0].split('-', 3).map(part => parseInt(part))
    const timeParts = parts2[0].split(':', 3).map(part => parseInt(part))
    const tzParts = parts2[1].split(':', 2).map(part => parseInt(part))
    
    const [year, month, day] = dateParts
    const [hours, minutes, seconds] = timeParts
    const [tzHours, tzMinutes] = tzParts

    validateDate(year, month, day)
    validateTime(hours, minutes, seconds)
    validateTime(tzHours, tzMinutes)

    result.push(getYearMonthAndDay(dateParts).join('-'))
    result.push(getHoursMinutesAndSeconds(timeParts).join(':'))
    result.push(tzSeparator + getHoursMinutesAndSeconds(tzParts).join(':'))
    
    return result
}

function getYearMonthAndDay(
    dateParts: number[]
): string[] {
    const day: string = normalizeTimeValue(dateParts[2]).substring(0,2)
    const month: string = normalizeTimeValue(dateParts[1]).substring(0,2)
    const year: string = dateParts[0].toString().substring(0,4)

    return [year, month, day]
}

function getHoursMinutesAndSeconds(
    timeParts: number[]
): string[] {
    let result = []

    const hours: string = normalizeTimeValue(timeParts[0]).substring(0,2)
    const minutes: string = normalizeTimeValue(timeParts[1]).substring(0,2)

    result.push(hours)
    result.push(minutes)

    if (timeParts.length === 3) {
        result.push(normalizeTimeValue(timeParts[2]).substring(0,2))
    }
    return result
}

function validateDate(
    year: number, 
    month: number, 
    day: number
): void {
    if(isNaN(day) || day < 1 || day > 31) {
        throw new Error("Invalid value for day: " + day)
    }
    if(isNaN(month) || month < 1 || month > 12) {
        throw new Error("Invalid value for month: " + month)
    }
    if(isNaN(year) || year < 1902 || year > (new Date()).getFullYear()) {
        throw new Error(
            "Invalid value for year: " + year 
            + " - must be between 1902 and " + (new Date()).getFullYear()
        )
    }
}

function validateTime(
    hours: number, 
    minutes: number, 
    seconds?: number
): void {
    if(isNaN(hours) || hours < 0 || hours > 23) {
        throw new Error("Invalid value for hours: " + hours);
    }
    if(isNaN(minutes) || minutes < 0 || minutes > 59) {
        throw new Error("Invalid value for minutes: " + minutes);
    }
    if(seconds && (isNaN(seconds) || seconds < 0 || seconds > 59)) {
        throw new Error("Invalid value for seconds: " + seconds);
    }
}

function normalizeTimeValue(timeValue: number): string {
    return timeValue < 10 ? '0' + timeValue : '' + timeValue
}

function splitTimeValue(
    timeValue: string, 
    delimeter: string, 
    expectedSize?: number
): string[] {
    const parts = timeValue.split(delimeter)

    if (expectedSize && parts.length !== expectedSize) {
        throw new Error('Could not split time value. Please try with different parameters.')
    }
    return parts
}