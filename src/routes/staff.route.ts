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
import { RouteType } from '../types/system/route.type'

import ClassDetail from '../views/ClassDetail'
import ClsLessons from '../views/ClsLessons'
import Inventories from '../views/Inventories'
import VenueBookings from '../views/VenueBookings'

const routes: RouteType[] = [
	// {
	//   path: '/student/dashboard',
	//   name: '首頁',
	//   icon: 'nc-icon nc-bank',
	//   component: Dashboard,
	//   inSidebar: true,
	// },
	{
		path: '/staff/clses/:clsId',
		name: '行事厝',
		icon: 'nc-icon nc-calendar-60',
		component: ClassDetail,
	},
	{
		path: '/staff/clses',
		name: '行事厝',
		icon: 'nc-icon nc-calendar-60',
		component: ClsLessons,
		inSidebar: true,
	},
	{
		path: '/staff/venue-bookings',
		name: '預約場地',
		icon: 'nc-icon nc-shop',
		component: VenueBookings,
		inSidebar: true,
	},
	{
		path: '/staff/inventories',
		name: '物品庫',
		icon: 'nc-icon nc-box-2',
		component: Inventories,
		inSidebar: true,
	},
]
export default routes
