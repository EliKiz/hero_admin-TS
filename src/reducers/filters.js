// const initialState = {
    
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all'
// }

// const filters = (state = initialState, action) => {

//     switch (action.type) {
//         case 'FILTER_FETCHING' : 
//             return { 
//                 ...state, 
//                 filtersLoadingStatus: 'loading'
//             }
//         case "FILTERS_FETCHED": 
//             return { 
//                 ...state, 
//                 filters: action.payload,
//                 filtersLoadingStatus: 'idle'
//             }
//         case 'FILTER_FETCHING_ERROR': 
//             return { 
//                 ...state, 
//                 filtersLoadingStatus: 'error',
//             }
//         case 'FILTER_BUTTON': 
//             return { 
//                 ...state, 
//                 activeFilter: action.payload,
//             }
//         default: return state
//     }
// }

// export default filters;