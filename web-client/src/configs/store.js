import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("../reducers", () => {
    const newRootReducer = require("../reducers").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
