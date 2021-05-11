import React from "react";
import { ErrorBoundary } from "./components/error-boundary";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./routes/routes";

function App() {
  return (
    <Provider store={store as any}>
      <HashRouter>
        <ErrorBoundary>
          <Switch>
            {Routes.map((item) => (
              <Route
                path={item.path}
                component={item.component}
                exact
                key={item.id}
              ></Route>
            ))}
            <Redirect from="/*" to="/home" />
          </Switch>
        </ErrorBoundary>
      </HashRouter>
    </Provider>
  );
}

export default App;
