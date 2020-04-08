// App Imports 
import { convertToString } from '../../../utils/numberUtils'

export default function build(
    page: number, 
    limit: number
): URLSearchParams {
    let params = new URLSearchParams()
    params.set('p', convertToString(page > 0 ? page : 1))
    params.set('limit', convertToString(limit > 0 ? limit : 5))
    return params
}