import React from "react";
import { ErrorBoundary } from "@components/index";
import {
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Main } from "@components/index";
import store from "./redux/store";
import { initSocket } from '@utils/socket';
initSocket()


const App: React.FC = () => {

  return (
    <Provider store={store as any}>
      <BrowserRouter>
        <ErrorBoundary>
          <Main/>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
