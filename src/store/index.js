import { configureStore } from '@reduxjs/toolkit';

import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filterSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    } 
    return next(action);
}

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    
});
// const store = createStore(
//                 combineReducers({heroes, filters}),
//                 compose( 
//                     applyMiddleware(thunk, stringMiddleware),
//                     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                 ) 
//             );  
export default store;