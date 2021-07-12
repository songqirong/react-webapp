import loadable from "react-loadable";
import { LoadingComponentFn } from "@/components/loading";
const _loadable = (fn: () => Promise<any>) =>
  loadable({
    loader: fn,
    loading: LoadingComponentFn,
    delay: 200,
  });
export const RegisterOrLoginComponent = _loadable(() => import("./register-or-login"));
export const HomeComponent = _loadable(() => import("./home"));
export const TestComponent = _loadable(() => import("./test"));
export const MyComponent = _loadable(() => import("./my"));
export const MessageComponent = _loadable(() => import("./message"));
export const IndexComponent = _loadable(() => import("./index"));
export const ChatComponent = _loadable(() => import("./chat"));
export const CompleteInfoComponent = _loadable(() => import("./complete-info"));
const routes = [
  {
    id: 1,
    path: "/home",
    component: IndexComponent,
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
  {
    id: 5,
    path: "/chat",
    component: ChatComponent,
  },
  {
    id: 6,
    path: "/message",
    component: MessageComponent,
  },
  {
    id: 7,
    path: "/my",
    component: MyComponent
  }
];
export default routes;
