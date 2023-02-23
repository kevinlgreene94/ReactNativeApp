import {createStore, combineReducers} from 'redux';
import cartReducer from '../reducers/reducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const rootReducer = combineReducers(
    {cartReducer}
    );

{/*const configureStore = () => {
    return createStore(rootReducer);
}*/}

export const store = createStore(rootReducer, applyMiddleware(thunk));