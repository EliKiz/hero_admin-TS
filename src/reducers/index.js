// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
//     filters: [],
//     activeFilter: 'all'
// }

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 // Когда получаем героев, необходимо отобразить только нужных героев 
//                 // filteredHeroes: state.activeFilter === 'all' ?
//                 //                 action.payload :
//                 //                 action.payload.filter(item => item.element === state.activeFilter), 
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_DELITE':
//             return { 
//                 ...state,
//                 heroes: state.heroes.filter((item =>  item.id !== action.payload)),
//                 //
//                 // filteredHeroes: state.activeFilter === 'all' ? 
//                 //                 newHeroes : 
//                 //                 newHeroes.filter(item => item.element === state.activeFilter)
//             }

//         case 'HEROES_ADD':
//             // Разворачиваем новых герове в новый массив и добавяем нового, которого сощдавали при помощи формы
//             // let newCreatedHeroList = [...state.heroes, action.payload]
//             return  {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//                 // filteredHeroes: state.activeFilter === 'all' ? 
//                 //     newCreatedHeroList : 
//                 //     newCreatedHeroList.filter(item => item.element === state.activeFilter)
//             }
//         case 'FILTER_BUTTON': 
//             console.log('action.payload', action.payload)
//             return { 
//                 ...state, 
//                 //записываем в поле автивного фильтра то, что было выбранно
//                 activeFilter: action.payload,
//                 // поле уже фильтрованных героев
//                 // filteredHeroes: action.payload === 'all' 
//                 //     ? state.heroes 
//                 //     : state.heroes.filter(item => item.element === action.payload)
//             }
//         default: return state
//     }
// }

// export default reducer;