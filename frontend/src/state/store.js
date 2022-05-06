import { createStore, compose } from 'redux';
import { sagaMiddleware, rootSaga } from "./sagas"
import reducer from "./reducers/rootReducer";
import middleware from "./middleware";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(middleware));

sagaMiddleware.run(rootSaga);

export default store;