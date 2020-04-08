// Imports
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// App Imports
import { routes } from '../../setup/routes'
import RouteInterface from '../../setup/routes/RouteInterface'
import Layout from '../../modules/common/component/Layout'
import NotFound from '../../modules/common/component/NotFound'

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Layout>
      <Switch>
		    {Object.values(routes).map((route: RouteInterface, index: number) => (
          <Route {...route} key={index} path={typeof route.path === 'function' ? route.path() : route.path}/>
        ))}

        <Route component={NotFound}/>
      </Switch>
    </Layout>
  )
}

export default App;