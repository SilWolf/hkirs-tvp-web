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
import AdminLayout from './layouts/Admin'

import authHelper from './helpers/auth.helper'
import store from './store'
import authUserSlice from './slices/authUser.slice'

const hist = createBrowserHistory()

const App = () => {
  useEffect(() => {
    // Try to get stored authUser and put it into redux
    const authUser = authHelper.getAuthUserFromLocalStorage()
    if (authUser) {
      store.dispatch(authUserSlice.actions.login(authUser))
    }
  }, [])

  return (
    <ReduxProvider store={store}>
      <Router history={hist}>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/" render={(props) => <PlainLayout {...props} />} />
        </Switch>
      </Router>
      <ToastContainer />
    </ReduxProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
