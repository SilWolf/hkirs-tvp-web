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
import { RouteType } from './types/system/route.type'

import Dashboard from './views/Dashboard'
import Notifications from './views/Notifications'
import Icons from './views/Icons'
import Typography from './views/Typography'
import TableList from './views/Tables'
import Maps from './views/Map'
import UserPage from './views/User'
import UpgradeToPro from './views/Upgrade'

import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import ForgotPassword from './views/ForgotPassword'
import AfterSSOSignIn from './views/AfterSSOSignIn'
import ResetPassword from './views/ResetPassword'
import Characters from './views/Characters'
import Character from './views/Character'

var routes: RouteType[] = [
  {
    path: '/sign-in',
    name: 'SignIn',
    icon: '',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    icon: '',
    component: SignUp,
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    icon: '',
    component: ForgotPassword,
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    icon: '',
    component: ResetPassword,
  },
  {
    path: '/connect/:provider/redirect',
    name: 'AfterSSOSignIn',
    icon: '',
    component: AfterSSOSignIn,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-bank',
    component: Dashboard,
  },
  {
    path: '/characters/:characterId',
    name: 'Character Detail',
    icon: 'nc-icon nc-diamond',
    component: Character
  },
  {
    path: '/characters',
    name: 'Characters',
    icon: 'nc-icon nc-diamond',
    component: Characters
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'nc-icon nc-diamond',
    component: Icons,
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: 'nc-icon nc-pin-3',
    component: Maps,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'nc-icon nc-bell-55',
    component: Notifications,
  },
  {
    path: '/user-page',
    name: 'User Profile',
    icon: 'nc-icon nc-single-02',
    component: UserPage,
  },
  {
    path: '/tables',
    name: 'Table List',
    icon: 'nc-icon nc-tile-56',
    component: TableList,
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: 'nc-icon nc-caps-small',
    component: Typography,
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    icon: 'nc-icon nc-spaceship',
    component: UpgradeToPro,
  },
]
export default routes
