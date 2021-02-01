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

import StudentClassDetail from '../views/ClassDetail'
import StudentClasses from '../views/Classes'
import CoursePurchase from '../views/CoursePurchase'

const routes: RouteType[] = [
	// {
	//   path: '/student/dashboard',
	//   name: '首頁',
	//   icon: 'nc-icon nc-bank',
	//   component: Dashboard,
	//   inSidebar: true,
	// },
	{
		path: '/student/classes/:classId',
		name: '我的課程',
		icon: 'nc-icon nc-bank',
		component: StudentClassDetail,
	},
	{
		path: '/student/classes',
		name: '我的課程',
		icon: 'nc-icon nc-bank',
		component: StudentClasses,
		inSidebar: true,
	},
	{
		path: '/student/course-purchase/:courseId',
		name: '報名課程',
		icon: 'nc-icon nc-diamond',
		component: CoursePurchase,
	},
]
export default routes
