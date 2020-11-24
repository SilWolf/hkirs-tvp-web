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

import Dashboard from '../views/Dashboard'
import Characters from '../views/Characters'
import Character from '../views/Character'
import CharacterBuilder from '../views/CharacterBuilder'
import RandomNpc from '../views/RandomNpc'

var routes: RouteType[] = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-bank',
    component: Dashboard,
    inSidebar: true,
  },
  {
    path: '/admin/characters/builder',
    name: 'Characters',
    icon: 'nc-icon nc-diamond',
    component: CharacterBuilder,
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
    inSidebar: true,
  },
  {
    path: '/admin/npc',
    name: 'NPC Randomize',
    icon: 'nc-icon nc-diamond',
    component: RandomNpc,
    inSidebar: true,
  },
]
export default routes
