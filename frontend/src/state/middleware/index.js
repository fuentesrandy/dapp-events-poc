
//
import { applyMiddleware } from "redux";

//
import { sagaMiddleware } from '../sagas';
import logger from "../utils/logger";


// order matters
let middleware = [];

if (process.env.NODE_ENV !== "production") {
    middleware.push(logger);
}

export default applyMiddleware(...middleware, sagaMiddleware);
