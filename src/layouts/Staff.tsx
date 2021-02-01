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
import { Redirect, Route, Switch } from 'react-router-dom'

import FixedPlugin from '../components/FixedPlugin/FixedPlugin'
import Footer from '../components/Footer/Footer'
import DemoNavbar from '../components/Navbars/DemoNavbar'
import Sidebar from '../components/Sidebar/Sidebar'

import routes from '../routes/staff.route'
import store from '../store'
import { History, Location } from 'history'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'

let ps: PerfectScrollbar

type Props = {
	history: History
	location: Location
}

type State = {
	activeColor: string
	backgroundColor: string
}

class Dashboard extends React.Component<Props, State> {
	mainPanel: React.RefObject<HTMLDivElement>

	constructor(props: Props) {
		super(props)
		this.state = {
			backgroundColor: 'black',
			activeColor: 'info',
		}
		this.mainPanel = React.createRef()
	}
	componentDidMount() {
		if (navigator.platform.indexOf('Win') > -1 && this.mainPanel?.current) {
			ps = new PerfectScrollbar(this.mainPanel.current)
			document.body.classList.toggle('perfect-scrollbar-on')
		}
	}
	componentWillUnmount() {
		if (navigator.platform.indexOf('Win') > -1) {
			ps.destroy()
			document.body.classList.toggle('perfect-scrollbar-on')
		}
	}
	componentDidUpdate(prevProps: Props) {
		if (prevProps.history.action === 'PUSH') {
			if (this.mainPanel?.current) {
				this.mainPanel.current.scrollTop = 0
			}
			if (document && document.scrollingElement) {
				document.scrollingElement.scrollTop = 0
			}
		}
	}
	handleActiveClick = (color: string) => {
		this.setState({ activeColor: color })
	}
	handleBgClick = (color: string) => {
		this.setState({ backgroundColor: color })
	}
	render() {
		const authUser = store.getState().authUser
		if (!authUser?.isSignIned || authUser?.user?.role?.type !== 'staff') {
			return <Redirect to='/auth/sign-in' />
		}

		return (
			<div className='wrapper'>
				<Sidebar
					{...this.props}
					routes={routes}
					bgColor={this.state.backgroundColor}
					activeColor={this.state.activeColor}
				/>
				<div className='main-panel' ref={this.mainPanel}>
					<DemoNavbar {...this.props} />
					<Switch>
						{routes.map((prop, key) => {
							return (
								<Route path={prop.path} component={prop.component} key={key} />
							)
						})}
						<Route path='*'>
							<Redirect to='/staff/classes' />
						</Route>
					</Switch>
					<Footer fluid />
				</div>
				<FixedPlugin
					bgColor={this.state.backgroundColor}
					activeColor={this.state.activeColor}
					handleActiveClick={this.handleActiveClick}
					handleBgClick={this.handleBgClick}
				/>
			</div>
		)
	}
}

export default Dashboard
