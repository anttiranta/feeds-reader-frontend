// App Imports
import CategoryInterface from './CategoryInterface'

export default interface ItemInterface 
{
    id: number
    title?: string
    description?: string
    link?: string
    pubDate?: string
    category?: CategoryInterface
    comments?: string
    createdAt?: string
    updatedAt?: string
}