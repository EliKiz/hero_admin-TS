import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import heroesFilterReducer from '../components/heroesFilters/heroesFilterSlice'
import heroesReducer from '../components/heroesList/heroesSlice'

const store = configureStore({ 
    reducer: { 
        heroes: heroesReducer,
        filters: heroesFilterReducer
    },
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>


export default store;