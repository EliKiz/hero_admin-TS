import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import heroesFilterReducer from '../components/heroesFilters/heroesFilterSlice'
import heroesReducer from '../components/heroesList/heroesSlice'

const stringMiddleware = () => (next:any) => (action:any) => { 
    // Аргумент next - слудующая функция из Middleware
    if(typeof action === 'string') { 
        return next({
            type: action
        })
    }

    return next(action)

}

const store = configureStore({ 
    reducer: { 
        heroes: heroesReducer,
        filters: heroesFilterReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>


export default store;