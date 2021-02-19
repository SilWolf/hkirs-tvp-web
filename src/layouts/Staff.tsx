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
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

import Footer from '../components/Footer/Footer'
import DemoNavbar from '../components/Navbars/DemoNavbar'
import Sidebar from '../components/Sidebar/Sidebar'

import routes from '../routes/staff.route'
import { RootState } from '../store'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'

let ps: PerfectScrollbar

const StaffLayout = (): JSX.Element => {
	const mainPanel = useRef<HTMLDivElement | null>(null)
	const location = useLocation()

	useEffect(() => {
		if (navigator.platform.indexOf('Win') > -1 && mainPanel?.current) {
			ps = new PerfectScrollbar(mainPanel.current)
			document.body.classList.toggle('perfect-scrollbar-on')
		}

		return () => {
			if (navigator.platform.indexOf('Win') > -1) {
				ps.destroy()
				document.body.classList.toggle('perfect-scrollbar-on')
			}
		}
	}, [])

	useEffect(() => {
		if (mainPanel?.current) {
			mainPanel.current.scrollTop = 0
		}
		if (document && document.scrollingElement) {
			document.scrollingElement.scrollTop = 0
		}
	}, [location])

	const authUser = useSelector((state: RootState) => state.authUser)
	if (!authUser?.isSignIned || authUser?.user?.role?.type !== 'staff') {
		return (
			<Redirect
				to={{
					pathname: '/auth/sign-in',
					state: {
						nextPathname: location.pathname,
					},
				}}
			/>
		)
	}

	return (
		<div className='wrapper'>
			<Sidebar routes={routes} />
			<div className='main-panel' ref={mainPanel}>
				<DemoNavbar />
				<Switch>
					{routes.map((prop, key) => {
						return (
							<Route path={prop.path} component={prop.component} key={key} />
						)
					})}
					<Route path='*'>
						<Redirect to='/staff/clses' />
					</Route>
				</Switch>
				<Footer fluid />
			</div>
		</div>
	)
}

export default StaffLayout
