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

import AfterSSOSignIn from '../views/AfterSSOSignIn'
import CourseDetail from '../views/CourseDetail'
import Courses from '../views/Courses'

const routes: RouteType[] = [
	{
		path: '/connect/:provider/redirect',
		name: 'AfterSSOSignIn',
		component: AfterSSOSignIn,
	},
	{
		path: '/courses/:courseId',
		name: 'Course Detail',
		component: CourseDetail,
	},
	{
		path: '/courses',
		name: 'Courses',
		component: Courses,
	},
]
export default routes
