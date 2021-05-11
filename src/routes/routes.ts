import loadable from "@loadable/component";
const RegisterComponent = loadable(() => import("./register"));
const HomeComponent = loadable(() => import("./home"));
const routes = [
  {
    id: 1,
    path: "/home",
    component: HomeComponent,
  },
  {
    id: 2,
    path: "/register",
    component: RegisterComponent,
  },
];
export default routes;
