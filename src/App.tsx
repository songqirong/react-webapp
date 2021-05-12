import React from "react";
import { ErrorBoundary } from "@components/index";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./routes/routes";
import { StaticContext } from "react-router";

function App() {
  return (
    <Provider store={store as any}>
      <BrowserRouter>
        <ErrorBoundary>
          <Switch>
            {Routes.map(
              (item: {
                path: any;
                component:
                  | React.ComponentType<any>
                  | React.ComponentType<
                      RouteComponentProps<any, StaticContext, unknown>
                    >
                  | undefined;
                id: React.Key | null | undefined;
              }) => (
                <Route
                  path={item.path}
                  component={item.component}
                  exact
                  key={item.id}
                ></Route>
              )
            )}
            <Redirect from="/*" to="/home" />
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
