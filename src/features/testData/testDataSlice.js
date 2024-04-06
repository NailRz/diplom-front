import { createSlice } from '@reduxjs/toolkit'

export const testData = createSlice({
    name: 'testData',
    initialState:{
        time: 0,
        wpm:0,
        startTime: 0,
        endTime: 0
    },
    reducers: {
        updateTime: (state, action) => {
            state.time = action.payload;
        },
        updateWpm: (state, action) => {
            state.wpm = action.payload;
        },
        updateStartTime: (state, action) => {
            // console.log('sadjklsajkdaklfjfkljklsaj',state.startTime)
            state.startTime = action.payload;
        },
        updateEndTime: (state, action) => {
            state.endTime = action.payload;
        },
    }
})

export const selectTime = (state) => state.testData.time
export const selectWpm = (state) => state.testData.wpm
export const selectStartTime = (state) => state.testData.startTime
export const selectEndTime = (state) => state.testData.endTime


export const {updateTime, updateWpm, updateStartTime, updateEndTime} = testData.actions

export default testData.reducer