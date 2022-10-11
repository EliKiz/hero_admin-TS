import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";
import { useHttp } from "../../hooks/http.hook";

// @ts-check
/**
 * @type {initialState}
 */

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}



// createAsyncThunk отвечает за загрузку данныx и отслеживание их состояния
export const fetchHeroes = createAsyncThunk(
    // тип дейсвтия, в формате: имя среза/тип действия
    'heroes/fetchHeroes',
    async () => { 
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes")
    }
);
// DELETE expiriens
export const deleteHeroes = createAsyncThunk(
    'heroes/deleteHeroes',
    async (id) => { 
        console.log('id issss', id)
        const {request} = useHttp();
        return await request(`http://localhost:3001/heroes/${id}`, 'DELETE')
    }
)
// ADDING experiens
export const addingHeroe = createAsyncThunk(
    'heroes/addingHeroes', 
    async (newHero) => { 
        const {request} = useHttp();
        return await request(`http://localhost:3001/heroes/`, 'POST', JSON.stringify(newHero))
    }
)

const heroesSlice = createSlice({ 
    name: 'heroes',
    initialState,
    reducers: { 
                        // Данынй функционал реализуется в extraReducers
        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        // heroesFetched: (state, action) => { 
        //     state.heroesLoadingStatus = 'idle';
        //     state.heroes = action.payload;
        //     // эквивалент 
        //     // ...state,
        //     // heroes: action.payload,
        //     // heroesLoadingStatus: 'idle'
        // },
        // heroesFetchingError: state => { 
        //     state.heroesLoadingStatus = 'error'
        // },
        heroesDelite: (state, action) => { 
            state.heroes = state.heroes.filter((item => item.id !== action.payload))
        },
        heroesAddFromForm: (state, action) => { 
            state.heroes.push(action.payload)
        },
        // addDefaultCase(() => {})
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
                // DELETE expiriens
            .addCase(deleteHeroes.fulfilled,(state, action) => { 
                state.heroesLoadingStatus = 'idle';
                state.heroes = state.heroes.filter((item => item.id !== action.meta.arg))
            })
                // Added experiens
            .addCase(addingHeroe.fulfilled, (state, action) => { 
                console.log(action.payload)
                state.heroes.push(action.payload)
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
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDelite,
    heroesAddFromForm
} = actions;