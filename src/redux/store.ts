import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
export default createStore<any>(reducers, applyMiddleware(thunk));
