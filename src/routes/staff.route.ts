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
import UserEvents from '../views/UserEvents'
import UserSchedules from '../views/UserSchedules'
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
		path: '/staff/clses/:classId',
		name: '我的課程',
		icon: 'nc-icon nc-book-bookmark',
		component: ClassDetail,
	},
	{
		path: '/staff/clses',
		name: '我的課程',
		icon: 'nc-icon nc-book-bookmark',
		component: ClsLessons,
		inSidebar: true,
	},
	{
		path: '/staff/venue-bookings',
		name: '預約場地',
		icon: 'nc-icon nc-calendar-60',
		component: VenueBookings,
		inSidebar: true,
	},
	{
		path: '/staff/user-schedules',
		name: '行事歷',
		icon: 'nc-icon nc-calendar-60',
		component: UserSchedules,
		inSidebar: true,
	},
	{
		path: '/staff/user-events',
		name: '活動',
		icon: 'nc-icon nc-check-2',
		component: UserEvents,
		inSidebar: true,
	},
]
export default routes
