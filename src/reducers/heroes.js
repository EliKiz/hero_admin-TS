// import { createReducer } from "@reduxjs/toolkit";

// import {
//     heroesFetching,
//     heroesFetched,
//     heroesFetchingError,
//     heroesDelite,
//     heroesAddFromForm
// } from '../action'


// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// }
                                        // createReducer
// // Actions должны быть созданы с помощью createAction redux Toolkit 
// const heroes = createReducer(initialState, builder => { 
//     builder 
//         // благодаря библиотеке Immer не нарушается принцип иммутабельности, так как она производится под капотом
//         .addCase(heroesFetching, state => { 
//             state.heroesLoadingStatus = 'loading'
//         })
//         .addCase(heroesFetched, (state, action) => { 
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//             // эквивалент 
//             // ...state,
//             // heroes: action.payload,
//             // heroesLoadingStatus: 'idle'
//         })
//         .addCase(heroesFetchingError, state => { 
//             state.heroesLoadingStatus = 'error'
//         })
//         .addCase(heroesDelite, (state, action) => { 
//             state.heroes = state.filter((item =>  item.id !== action.payload))
//         })
//         .addCase(heroesAddFromForm, (state, action) => { 
//             state.heroes.push(action.payload)
//         })
//         .addDefaultCase(() => {})
// })

// // const heroes = (state = initialState, action) => {
// //     switch (action.type) {
// //         case 'HEROES_FETCHING':
// //             return {
// //                 ...state,
// //                 heroesLoadingStatus: 'loading'
// //             }
// //         case 'HEROES_FETCHED':
// //             return {
// //                 ...state,
// //                 heroes: action.payload,
// //                 heroesLoadingStatus: 'idle'
// //                 // Когда получаем героев, необходимо отобразить только нужных героев 
// //                 // filteredHeroes: state.activeFilter === 'all' ?
// //                 //                 action.payload :
// //                 //                 action.payload.filter(item => item.element === state.activeFilter), 
// //             }
// //         case 'HEROES_FETCHING_ERROR':
// //             return {
// //                 ...state,
// //                 heroesLoadingStatus: 'error'
// //             }
// //         case 'HEROES_DELITE':
// //             return { 
// //                 ...state,
// //                 heroes: state.heroes.filter((item =>  item.id !== action.payload)),
// //                 //
// //                 // filteredHeroes: state.activeFilter === 'all' ? 
// //                 //                 newHeroes : 
// //                 //                 newHeroes.filter(item => item.element === state.activeFilter)
// //             }

// //         case 'HEROES_ADD':
// //             // Разворачиваем новых герове в новый массив и добавяем нового, которого сощдавали при помощи формы
// //             // let newCreatedHeroList = [...state.heroes, action.payload]
// //             return  {
// //                 ...state,
// //                 heroes: [...state.heroes, action.payload],
// //                 // filteredHeroes: state.activeFilter === 'all' ? 
// //                 //     newCreatedHeroList : 
// //                 //     newCreatedHeroList.filter(item => item.element === state.activeFilter)
// //             }
// //         default: return state
// //     }
// // }

// export default heroes;