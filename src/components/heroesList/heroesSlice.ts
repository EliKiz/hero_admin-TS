import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";
import { ListService } from "../../service/ListService";

interface HeroesState { 
    heroes : HeroesItem[],
    heroesLoadingStatus: 'idle' | 'loading' | 'error' 
}

export interface HeroesItem { 
    id: string,
    name: string,
    description: string,
    element: string
}

const initialState:HeroesState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => { 
        const {requestHeroes} = ListService();
        return await requestHeroes("http://localhost:3001/heroes")
    }
);

const heroesSlice = createSlice({ 
    name: 'heroes',
    initialState,
    reducers: { 
        heroesDelite: (state, action ) => { 
            state.heroes = state.heroes.filter((item => item.id !== action.payload))
        },
        heroesAddFromForm: (state, action) => { 
            state.heroes.push(action.payload)
        },
    },
    extraReducers: (duilder) => { 
        duilder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'} )
            .addCase(fetchHeroes.fulfilled, (state, action) => { 
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => { 
                state.heroesLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
//
export const {
    heroesDelite,
    heroesAddFromForm
} = actions;

