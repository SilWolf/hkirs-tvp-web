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
import ClsApplicationDetail from '../views/ClsApplicationDetail'
import ClsApplications from '../views/ClsApplications'
import StudentClses from '../views/ClsLessons'
import CourseDetail from '../views/CourseDetail'
import CoursePurchase from '../views/CoursePurchase'
import Courses from '../views/Courses'

const routes: RouteType[] = [
	// {
	//   path: '/student/dashboard',
	//   name: '首頁',
	//   icon: 'nc-icon nc-bank',
	//   component: Dashboard,
	//   inSidebar: true,
	// },
	{
		path: '/student/clses/:clsId',
		name: '我的課程',
		icon: 'nc-icon nc-bank',
		component: StudentClassDetail,
	},
	{
		path: '/student/clses',
		name: '我的課程',
		icon: 'nc-icon nc-bank',
		component: StudentClses,
		inSidebar: true,
	},
	{
		path: '/student/course-purchase/:courseId',
		name: '報名課程',
		icon: 'nc-icon nc-diamond',
		component: CoursePurchase,
	},
	{
		path: '/student/cls-applications/:id',
		name: '報名課程',
		icon: 'nc-icon nc-diamond',
		component: ClsApplicationDetail,
	},
	{
		path: '/student/cls-applications',
		name: '我的報名',
		icon: 'nc-icon nc-diamond',
		component: ClsApplications,
		inSidebar: true,
	},
	{
		path: '/student/courses/:id',
		name: '熱門課程',
		icon: 'nc-icon nc-diamond',
		component: CourseDetail,
	},
	{
		path: '/student/courses',
		name: '熱門課程',
		icon: 'nc-icon nc-diamond',
		component: Courses,
		inSidebar: true,
	},
]
export default routes
