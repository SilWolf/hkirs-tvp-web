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

import ForgotPassword from '../views/ForgotPassword'
import ResetPassword from '../views/ResetPassword'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'

const routes: RouteType[] = [
	{
		path: '/auth/sign-in',
		name: 'SignIn',
		component: SignIn,
	},
	{
		path: '/auth/sign-up',
		name: 'SignUp',
		component: SignUp,
	},
	{
		path: '/auth/forgot-password',
		name: 'Forgot Password',
		component: ForgotPassword,
	},
	{
		path: '/auth/reset-password',
		name: 'Reset Password',
		component: ResetPassword,
	},
]
export default routes
