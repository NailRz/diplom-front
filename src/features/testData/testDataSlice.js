import { createSlice } from '@reduxjs/toolkit'

export const testData = createSlice({
    name: 'testData',
    initialState:{
        time: 0,
        wpm:0
    },
    reducers: {
        updateTime: (state, action) => {
            state.time = action.payload;
        },
        updateWpm: (state, action) => {
            state.wpm = action.payload;
        },
    }
})

export const changeTime = (state) => state.testData.time
export const changeWpm = (state) => state.testData.wpm

export const {updateTime, updateWpm} = testData.actions
export default testData.reducer