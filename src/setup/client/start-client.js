// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "@apollo/react-hooks"

// App Imports
import App from './App'
import store from '../store'
import { routeApi } from '../routes'

const client = new ApolloClient({
  uri: routeApi
})

// Client App
const render = () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root')
  )
}

export default function () {
  render()
  store.subscribe(render)
}