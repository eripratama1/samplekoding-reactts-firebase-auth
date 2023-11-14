import { lazy } from "react";

const Profile = lazy(() => import('../pages/user/Profile'))

const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: Profile
  },

];

const routes = [...coreRoutes];
export default routes;