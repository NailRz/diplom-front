import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isTestStart: false,
    isTestComplete: false,
    isTyping: false,
    isTestInvalid: false,
};

export const testStates = createSlice({
    name: 'testStates',
    initialState,
    reducers: {
        updateIsTyping: (state, action) => {
            state.isTyping = action.payload;
        },
        updateIsTestComplete: (state, action) => {
            state.isTestComplete = action.payload;
        },
        updateIsTestInvalid: (state, action) => {
            state.isTestInvalid = action.payload;
        },
        resetStates: () => initialState,
    },
});

export const selectIsTyping = (state) => state.testStates.isTyping
export const selectIsTestComplete = (state) => state.testStates.isTestComplete
export const selectIsTestInvalid = (state) => state.testStates.isTestInvalid

export const {updateIsTyping, updateIsTestComplete, updateIsTestInvalid, resetStates} = testStates.actions
export default testStates.reducer