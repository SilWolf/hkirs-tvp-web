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
import React, { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import classnames from 'classnames'

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

const Header = (): JSX.Element => {
	const sidebarToggle = useRef<HTMLButtonElement | null>(null)
	const history = useHistory()

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

	const brandName = useSelector((state: RootState) => state.page.brandName)

	const handleOpenToggle = useCallback(() => {
		setIsOpen((prev) => !prev)
	}, [setIsOpen])

	const handleDropdownToggle = useCallback(() => {
		setIsDropdownOpen((prev) => !prev)
	}, [setIsDropdownOpen])

	const handleOpenSidebar = useCallback(() => {
		document.documentElement.classList.toggle('nav-open')
		if (sidebarToggle && sidebarToggle.current) {
			sidebarToggle.current.classList.toggle('toggled')
		}
	}, [sidebarToggle])

	const handleClickSignOut = useCallback(() => {
		authHelper.signOut()
		history.push('/auth/sign-in')
	}, [history])

	return (
		// add or remove classes depending if we are on full-screen-maps page or not
		<Navbar
			expand='lg'
			className={classnames(
				'navbar-absolute',
				'fixed-top',
				'navbar-transparent'
			)}
		>
			<Container fluid>
				<div className='navbar-wrapper'>
					<div className='navbar-toggle'>
						<button
							type='button'
							ref={sidebarToggle}
							className='navbar-toggler'
							onClick={handleOpenSidebar}
						>
							<span className='navbar-toggler-bar bar1' />
							<span className='navbar-toggler-bar bar2' />
							<span className='navbar-toggler-bar bar3' />
						</button>
					</div>
					<NavbarBrand href='/'>{brandName}</NavbarBrand>
				</div>
				<NavbarToggler onClick={handleOpenToggle}>
					<span className='navbar-toggler-bar navbar-kebab' />
					<span className='navbar-toggler-bar navbar-kebab' />
					<span className='navbar-toggler-bar navbar-kebab' />
				</NavbarToggler>
				<Collapse isOpen={isOpen} navbar className='justify-content-end'>
					<Nav navbar>
						<Dropdown nav isOpen={isDropdownOpen} toggle={handleDropdownToggle}>
							<DropdownToggle caret nav>
								<i className='nc-icon nc-settings-gear-65' />
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem tag='a' onClick={handleClickSignOut}>
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

export default Header
