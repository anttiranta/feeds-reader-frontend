// Imports
import { QueryLazyOptions } from '@apollo/react-hooks'

// Get Item Query Params
export default class GetItemParams implements QueryLazyOptions<{ id: number }> {
    variables?: { id: number };

    constructor(id: string) {
        this.variables = { id: parseInt(id) }
    }
}