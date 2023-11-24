import { lazy } from "react";
import AccountSetting from "../pages/user/AccountSetting";

const Profile = lazy(() => import('../pages/user/Profile'))

const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: Profile
  },
  {
    path:'/account-setting',
    title:'Account Setting',
    component:AccountSetting
  }

];

const routes = [...coreRoutes];
export default routes;