import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import appWatcher from "./watchers/app"

export function* rootSaga() {
    yield all([
        appWatcher()
    ]);
}


export const sagaMiddleware = createSagaMiddleware();