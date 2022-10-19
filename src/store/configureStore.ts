import {
  createStore,
  applyMiddleware,
  Store,
  StoreEnhancer,
  StoreEnhancerStoreCreator
} from "redux";

import { routerMiddleware } from "connected-react-router";
import { rootReducer, State } from ".";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { History } from "history";

export default function configureStore(history: History): Store<State> {
  const middleware: StoreEnhancer = applyMiddleware(thunkMiddleware, routerMiddleware(history));
  const createStoreWithMiddleware: StoreEnhancerStoreCreator = composeWithDevTools(middleware)(createStore);
  const store: Store<State> = createStoreWithMiddleware(rootReducer);
  // loadUser(store, userManager);
  return store;
}