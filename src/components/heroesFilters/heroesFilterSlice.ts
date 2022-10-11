import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit/";
import { useHttp } from "../../hooks/http.hook";

interface HeroesFilterState { 
    filters: object[],
    filtersLoadingStatus: 'idle' | 'loading' | 'error',
    activeFilter: string
}

const initialState:HeroesFilterState = {
    
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'

}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters', 
    async () => { 
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }
)

// createSlice вернет : name, объекты с actions и reducer
const heroesFiltersSlice = createSlice({ 
    name: 'filters',
    initialState,
    reducers: { 
        // мы генерируем actionsCreators и те действия, которые будут к ним подвязаны
        // filtersFetched: (state, action) => {
        //     state.filters =  action.payload; 
        //     state.filtersLoadingStatus = 'idle'},
        // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        // filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
        filterClick: (state, action: PayloadAction<string>) => {state.activeFilter =  action.payload}
    },
    extraReducers: (builder) => { 
        builder 
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters =  action.payload; 
                state.filtersLoadingStatus = 'idle'})

            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    } 
})


const {actions, reducer} = heroesFiltersSlice

// export default reducer
// action creators которые генерируются автоматически в объект actions
export const { 
    
    filterClick
} = actions

export default heroesFiltersSlice.reducer

