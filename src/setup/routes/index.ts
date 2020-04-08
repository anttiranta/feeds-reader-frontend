// App Imports
import { APP_URL_API, APP_URL } from '../config/env'
import item from './item'
import pages from './pages'

// Combined routes
export const routes = Object.assign(pages, item)

// API Routes
export const routeApi = APP_URL_API

// Image
export const routeImage = APP_URL