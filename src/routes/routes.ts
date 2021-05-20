import loadable from "react-loadable";
import { LoadingComponentFn } from "@/components/loading";
const _loadable = (fn: () => Promise<any>) =>
  loadable({
    loader: fn,
    loading: LoadingComponentFn,
    delay: 200,
  });
const RegisterOrLoginComponent = _loadable(() => import("./register-or-login"));
const HomeComponent = _loadable(() => import("./home"));
const TestComponent = _loadable(() => import("./test"));
const CompleteInfoComponent = _loadable(() => import("./complete-info"));
const routes = [
  {
    id: 1,
    path: "/home",
    component: HomeComponent,
  },
  {
    id: 2,
    path: "/register-or-login",
    component: RegisterOrLoginComponent,
  },
  {
    id: 3,
    path: "/test",
    component: TestComponent,
  },
  {
    id: 4,
    path: "/complete-info",
    component: CompleteInfoComponent,
  },
];
export default routes;
