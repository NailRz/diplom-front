import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    time: 0,
    wpm: 0,
    startTime: 0,
    endTime: 0,
    words: [],
    inputText: '',
};

export const testData = createSlice({
    name: 'testData',
    initialState,
    reducers: {
        updateTime: (state, action) => {
            state.time = action.payload;
        },
        updateWpm: (state, action) => {
            state.wpm = action.payload;
        },
        updateStartTime: (state, action) => {
            state.startTime = action.payload;
        },
        updateEndTime: (state, action) => {
            state.endTime = action.payload;
        },
        updateWords: (state, action) => {
            state.words = action.payload;
        },
        updateInputText: (state, action) => {
            state.inputText = action.payload;
        },
        resetData: () => initialState,
    },
});

export const selectTime = (state) => state.testData.time
export const selectWpm = (state) => state.testData.wpm
export const selectStartTime = (state) => state.testData.startTime
export const selectEndTime = (state) => state.testData.endTime
export const selectWords = (state) => state.testData.words
export const selectInputText = (state) => state.testData.inputText

export const {updateTime, updateWpm, updateStartTime, updateEndTime, updateWords, updateInputText, resetData} = testData.actions

export default testData.reducer