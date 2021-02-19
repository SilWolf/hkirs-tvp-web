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
import React, { useCallback, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { RouteType } from '../../types/system/route.type'

import { Nav } from 'reactstrap'

import logo from '../../logo.png'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'

let ps: PerfectScrollbar

type Props = {
	routes: RouteType[]
}

const Sidebar = ({ routes }: Props): JSX.Element => {
	const sidebar = useRef<HTMLDivElement | null>(null)
	const location = useLocation()

	const isActiveRoute = useCallback(
		(routeName: string) => location.pathname.indexOf(routeName) !== -1,
		[location]
	)

	useEffect(() => {
		if (navigator.platform.indexOf('Win') > -1 && sidebar && sidebar.current) {
			ps = new PerfectScrollbar(sidebar.current, {
				suppressScrollX: true,
				suppressScrollY: false,
			})
		}

		return () => {
			if (navigator.platform.indexOf('Win') > -1 && ps) {
				ps.destroy()
			}
		}
	}, [])

	return (
		<div className='sidebar'>
			<div className='logo'>
				<a href='/' className='simple-text logo-mini'>
					<div className='logo-img'>
						<img src={logo} alt='react-logo' />
					</div>
				</a>
				<a href='/' className='simple-text logo-normal'>
					HKIRS師生平台
				</a>
			</div>
			<div className='sidebar-wrapper' ref={sidebar}>
				<Nav>
					{routes
						.filter((route) => route.inSidebar)
						.map((prop, key) => {
							return (
								<li key={key}>
									<NavLink
										to={prop.path}
										className='nav-link'
										activeClassName='active'
										isActive={() => isActiveRoute(prop.path)}
									>
										<i className={prop.icon} />
										<p>{prop.name}</p>
									</NavLink>
								</li>
							)
						})}
				</Nav>
			</div>
		</div>
	)
}

export default Sidebar
