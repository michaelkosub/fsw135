import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './components/Auth.js'
import Public from './components/Public.js'
import { UserContext } from './context/UserProvider.js'
import ProtectedRoute from "./components/ProtectedRoute.js"

export default function App() {
  const { token } = useContext(UserContext)
  return (
    <div classname='app'>
     
      <Switch>
        <Route
          exact path='/'
          render={() => token? <Redirect to='profile' /> : <Auth />}
        />

     

        <ProtectedRoute
          path='/public'
          component={ Public }
          redirectTo='/'
          token= { token }
        />

      </Switch>
    </div>
  )
} 