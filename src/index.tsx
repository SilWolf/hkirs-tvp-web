/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useAsync } from 'react-async'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/paper-dashboard.scss?v=1.2.0'
import './assets/demo/demo.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import 'react-toastify/dist/ReactToastify.css'

import PlainLayout from './layouts/Plain'
import StudentLayout from './layouts/Student'

import authHelper from './helpers/auth.helper'
import store from './store'
import { Spinner } from 'reactstrap'

const hist = createBrowserHistory()

const tryAutoSignInFn = async () => {
  return authHelper.tryAutoSignIn()
}

const App = () => {
  const tryAutoSignInAsync = useAsync({
    promiseFn: tryAutoSignInFn,
  })

  if (tryAutoSignInAsync.isLoading) {
    return <Spinner />
  }

  return (
    <ReduxProvider store={store}>
      <Router history={hist}>
        <Switch>
          <Route
            path="/student"
            render={(props) => <StudentLayout {...props} />}
          />
          <Route path="/" render={(props) => <PlainLayout {...props} />} />
        </Switch>
      </Router>
      <ToastContainer />
    </ReduxProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
