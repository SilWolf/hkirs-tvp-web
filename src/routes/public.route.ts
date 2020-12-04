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

import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import ForgotPassword from '../views/ForgotPassword'
import AfterSSOSignIn from '../views/AfterSSOSignIn'
import ResetPassword from '../views/ResetPassword'
import CourseDetail from '../views/CourseDetail'

var routes: RouteType[] = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword,
  },
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
]
export default routes
