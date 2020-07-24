import anecdoteReducer from "./reducers/anecdoteReducer";
import notifReducer from './reducers/notifReducer'
import filterReducer from './reducers/filterReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notifReducer,
    filter: filterReducer
})

const store = createStore(
    reducer, 
    composeWithDevTools(
        applyMiddleware(thunk)

    ));

export default store;
