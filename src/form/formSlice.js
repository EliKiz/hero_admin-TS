import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    name: '',
    description: '',
    select: ''
}


export const formSlice = createSlice({ 
    name: 'hero',
    initialState,
    reducers :  {
        saveName: (state, action) => state.name = action.payload
    }
})