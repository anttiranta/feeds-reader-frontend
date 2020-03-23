// App Imports
import Items from '../../modules/item/pages/Items'
import EditForm from '../../modules/item/pages/EditForm'
import Item from '../../modules/item/pages/Item'

// User routes
export default {
  home: {
    path: '/',
    component: Items,
    exact: true
  },

  showItem: {
    path: (id = ':id') => (`/item/view/${ id }`),
    component: Item
  },

  createItem: {
    path: '/item/create',
    component: EditForm
  },

  editItem: {
    path: (id = ':id') => (`/item/edit/${ id }`),
    component: EditForm
  },
}