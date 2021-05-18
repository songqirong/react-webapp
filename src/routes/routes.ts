import loadable from "react-loadable";
import { LoadingComponentFn } from "@/components/loading";
const _loadable = (fn: () => Promise<any>) =>
  loadable({
    loader: fn,
    loading: LoadingComponentFn,
    delay: 200,
  });
const RegisterComponent = _loadable(() => import("./register-or-login"));
const HomeComponent = _loadable(() => import("./home"));
const TestComponent = _loadable(() => import("./test"));
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
  {
    id: 3,
    path: "/test",
    component: TestComponent,
  },
];
export default routes;
