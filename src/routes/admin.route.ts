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
import { RouteType } from '../types/system/route.type'

import Dashboard from '../views/Dashboard'
import Notifications from '../views/Notifications'
import Icons from '../views/Icons'
import Typography from '../views/Typography'
import TableList from '../views/Tables'
import Maps from '../views/Map'
import UserPage from '../views/User'
import Characters from '../views/Characters'
import Character from '../views/Character'


var routes: RouteType[] = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-bank',
    component: Dashboard,
    inSidebar: true
  },
  {
    path: '/admin/characters/:characterId',
    name: 'Character Detail',
    icon: 'nc-icon nc-diamond',
    component: Character,
  },
  {
    path: '/admin/characters',
    name: 'Characters',
    icon: 'nc-icon nc-diamond',
    component: Characters,
    inSidebar: true
  },
  {
    path: '/admin/icons',
    name: 'Icons',
    icon: 'nc-icon nc-diamond',
    component: Icons,
    inSidebar: true
  },
  {
    path: '/admin/maps',
    name: 'Maps',
    icon: 'nc-icon nc-pin-3',
    component: Maps,
    inSidebar: true
  },
  {
    path: '/admin/notifications',
    name: 'Notifications',
    icon: 'nc-icon nc-bell-55',
    component: Notifications,
    inSidebar: true
  },
  {
    path: '/admin/user-page',
    name: 'User Profile',
    icon: 'nc-icon nc-single-02',
    component: UserPage,
    inSidebar: true
  },
  {
    path: '/admin/tables',
    name: 'Table List',
    icon: 'nc-icon nc-tile-56',
    component: TableList,
    inSidebar: true
  },
  {
    path: '/admin/typography',
    name: 'Typography',
    icon: 'nc-icon nc-caps-small',
    component: Typography,
    inSidebar: true
  },
]
export default routes
