// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "@apollo/react-hooks"
import { BrowserRouter as Router } from 'react-router-dom'

// App Imports
import App from './App'
import store from '../store'
import { routeApi } from '../routes'

const client = new ApolloClient({
  uri: routeApi
})

// Client App
const render: () => void = () => {
  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

export default function () {
  render()
  store.subscribe(render)
}