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
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useAsync } from 'react-async'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider as ReduxProvider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import authHelper from './helpers/auth.helper'

import { Spinner } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/paper-dashboard.scss?v=1.2.0'
import './assets/demo/demo.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import AuthLayout from './layouts/Auth'
import PublicLayout from './layouts/Public'
import StaffLayout from './layouts/Staff'
import StudentLayout from './layouts/Student'
import store from './store'
import { createBrowserHistory } from 'history'

// [react-query] Create a client
const queryClient = new QueryClient()

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
		<QueryClientProvider client={queryClient}>
			<ReduxProvider store={store}>
				<Router history={hist}>
					<Switch>
						<Route
							path='/student'
							render={(props) => <StudentLayout {...props} />}
						/>
						<Route
							path='/staff'
							render={(props) => <StaffLayout {...props} />}
						/>
						<Route path='/auth' render={(props) => <AuthLayout {...props} />} />
						<Route path='/' render={(props) => <PublicLayout {...props} />} />
					</Switch>
				</Router>
				<ToastContainer />
				<ReactQueryDevtools initialIsOpen={false} />
			</ReduxProvider>
		</QueryClientProvider>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
