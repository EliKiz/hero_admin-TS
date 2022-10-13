import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit/";
import { ListService } from "../../service/ListService";
import {Options} from '../heroesAddForm/HeroesAddForm'


interface HeroesFilterState { 
    filters: Options[],
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
        const {requestFilter} = ListService();
        return await requestFilter("http://localhost:3001/filters")
    }
)

const heroesFiltersSlice = createSlice({ 
    name: 'filters',
    initialState,
    reducers: { 
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

export const {     
    filterClick
} = actions

export default heroesFiltersSlice.reducer

