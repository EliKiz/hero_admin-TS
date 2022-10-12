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

interface payloadType { 
    
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
            state.heroes = state.heroes.filter((item => item !== action.payload))
        },
        heroesAddFromForm: (state, action) => { 
            state.heroes.push(action.payload)
        },
    },
    extraReducers: (duilder) => { 
        duilder
                //pending Когда запрос только формируется(отправляется)
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'} )
                // fulfilled Когда запрос выполнился успешно
            .addCase(fetchHeroes.fulfilled, (state, action) => { 
                state.heroesLoadingStatus = 'idle';
                // в action.payload автматичски попадут данные, которые пришли от сервера
                state.heroes = action.payload;
            })
                // rejected Когда запрос завершился с ошибкой
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

