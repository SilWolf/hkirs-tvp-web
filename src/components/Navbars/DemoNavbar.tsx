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
import { connect } from 'react-redux'

import authHelper from '../../helpers/auth.helper'

import {
	Collapse,
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarToggler,
} from 'reactstrap'

import { RootState } from '../../store'
import { History, Location } from 'history'

type Props = {
	location: Location
	history: History
	brandName: string
}

type State = {
	isOpen: boolean
	dropdownOpen: boolean
	color: string
}

class Header extends React.Component<Props, State> {
	sidebarToggle: React.RefObject<HTMLButtonElement>

	constructor(props: Props) {
		super(props)
		this.state = {
			isOpen: false,
			dropdownOpen: false,
			color: 'transparent',
		}
		this.toggle = this.toggle.bind(this)
		this.dropdownToggle = this.dropdownToggle.bind(this)
		this.sidebarToggle = React.createRef()
		this.handleClickSignOut = this.handleClickSignOut.bind(this)
	}
	toggle() {
		if (this.state.isOpen) {
			this.setState({
				color: 'transparent',
			})
		} else {
			this.setState({
				color: 'dark',
			})
		}
		this.setState({
			isOpen: !this.state.isOpen,
		})
	}
	dropdownToggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		})
	}
	openSidebar() {
		document.documentElement.classList.toggle('nav-open')
		if (this.sidebarToggle && this.sidebarToggle.current) {
			this.sidebarToggle.current.classList.toggle('toggled')
		}
	}
	// function that adds color dark/transparent to the navbar on resize (this is for the collapse)
	updateColor() {
		if (window.innerWidth < 993 && this.state.isOpen) {
			this.setState({
				color: 'dark',
			})
		} else {
			this.setState({
				color: 'transparent',
			})
		}
	}
	handleClickSignOut() {
		authHelper.signOut()
		window.location.href = '/'
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateColor.bind(this))
	}
	componentDidUpdate(prevProps: Props) {
		if (
			window.innerWidth < 993 &&
			prevProps.history.location.pathname !== prevProps.location.pathname &&
			document.documentElement.className.indexOf('nav-open') !== -1
		) {
			document.documentElement.classList.toggle('nav-open')
			if (this.sidebarToggle && this.sidebarToggle.current) {
				this.sidebarToggle.current.classList.toggle('toggled')
			}
		}
	}
	render() {
		return (
			// add or remove classes depending if we are on full-screen-maps page or not
			<Navbar
				color={
					this.props.location.pathname.indexOf('full-screen-maps') !== -1
						? 'dark'
						: this.state.color
				}
				expand='lg'
				className={
					this.props.location.pathname.indexOf('full-screen-maps') !== -1
						? 'navbar-absolute fixed-top'
						: 'navbar-absolute fixed-top ' +
						  (this.state.color === 'transparent' ? 'navbar-transparent ' : '')
				}
			>
				<Container fluid>
					<div className='navbar-wrapper'>
						<div className='navbar-toggle'>
							<button
								type='button'
								ref={this.sidebarToggle}
								className='navbar-toggler'
								onClick={() => this.openSidebar()}
							>
								<span className='navbar-toggler-bar bar1' />
								<span className='navbar-toggler-bar bar2' />
								<span className='navbar-toggler-bar bar3' />
							</button>
						</div>
						<NavbarBrand href='/'>{this.props.brandName}</NavbarBrand>
					</div>
					<NavbarToggler onClick={this.toggle}>
						<span className='navbar-toggler-bar navbar-kebab' />
						<span className='navbar-toggler-bar navbar-kebab' />
						<span className='navbar-toggler-bar navbar-kebab' />
					</NavbarToggler>
					<Collapse
						isOpen={this.state.isOpen}
						navbar
						className='justify-content-end'
					>
						<Nav navbar>
							<Dropdown
								nav
								isOpen={this.state.dropdownOpen}
								toggle={this.dropdownToggle}
							>
								<DropdownToggle caret nav>
									<i className='nc-icon nc-settings-gear-65' />
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem tag='a' onClick={this.handleClickSignOut}>
										登出
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	brandName: state.page.brandName,
})

export default connect(mapStateToProps)(Header)
