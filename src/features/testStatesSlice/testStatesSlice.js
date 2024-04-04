import { createSlice } from '@reduxjs/toolkit'

export const testStates = createSlice({
    name: 'testStates',
    initialState:{
        isTestStart: false,
        isTestComplete: false,
        isTyping:false,
    },
    reducers: {
        updateIsTyping: (state, action) => {
            state.isTyping = action.payload;
        },
        updateIsTestComplete: (state, action) => {
            state.isTestComplete = action.payload;
        },
        updateWpm: (state, action) => {
            state.wpm = action.payload;
        },
    }
})

export const selectIsTyping = (state) => state.testStates.isTyping
export const selectIsTestComplete = (state) => state.testStates.isTestComplete

export const {updateIsTyping, updateIsTestComplete} = testStates.actions
export default testStates.reducer