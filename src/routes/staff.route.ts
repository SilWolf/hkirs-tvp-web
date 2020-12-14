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

import Classes from '../views/Classes'
import ClassDetail from '../views/ClassDetail'
import UserSchedules from '../views/UserSchedules'

var routes: RouteType[] = [
  // {
  //   path: '/student/dashboard',
  //   name: '首頁',
  //   icon: 'nc-icon nc-bank',
  //   component: Dashboard,
  //   inSidebar: true,
  // },
  {
    path: '/staff/classes/:classId',
    name: '我的課程',
    icon: 'nc-icon nc-bank',
    component: ClassDetail,
  },
  {
    path: '/staff/classes',
    name: '我的課程',
    icon: 'nc-icon nc-bank',
    component: Classes,
    inSidebar: true,
  },
  {
    path: '/staff/user-schedules',
    name: '行事歷',
    icon: 'nc-icon nc-bank',
    component: UserSchedules,
    inSidebar: true,
  },
]
export default routes
