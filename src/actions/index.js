// import { createAction } from "@reduxjs/toolkit";
// import {heroesFetching, heroesFetched, heroesFetchingError} from "../components/heroesList/heroesSlice"

import { filtersFetching, filtersFetched, filtersFetchingError } from '../components/heroesFilters/heroesFiltersSlice'

// export const fetchHeroes = (request) => (dispatch) => { 
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//     .then(data => dispatch(heroesFetched(data)))
//     .catch(() => dispatch(heroesFetchingError()))
// }

export const fetchFilters = (request) => (dispatch) => { 
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))

}
                                        // createAction
                // CreateActions HEROE теперь создаются в createSlice()
// export const heroesFetching = createAction('HEROES_FETCHING')

    // export const heroesFetched = (heroes) => {
    //     return {
    //         type: 'HEROES_FETCHED',
    //         payload: heroes
    //     }
    // }

        // аргумент data который приходит в action, автоматически пеердается в поле payload.
        // но если будут добавлены дополнительный аргументы в вызов action, то они проигнорируются
//     export const heroesFetched = createAction('HEROES_FETCHED')

//     export const heroesDelite = createAction('HEROES_DELITE')
    
//     export const heroesAddFromForm = createAction('HEROES_ADD')

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

                // CrearteActions Filter тепрь создается в createSlice()

// export const filtersFetched = createAction('FILTERS_FETCHED')
// export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR')
// export const filterClick = createAction('FILTER_BUTTON')


            // Thunk
// Ключевая особенность - передавать функцию, кторая затем будет делать что то асинхронно 
// actionCreator будет возвращать функцию, которая в себя принимает dispatch
// export const filterClick = (value) => (dispatch) =>  { 
    // возвращаем функцию, которая через 1 сек, будет запускать нужный duspatch
    // setTimeout(() => { 
        // dispatch({ 
            // type: 'FILTER_BUTTON',
            // payload: value
        // })
    // }, 1000 )
// }       

    
// }       