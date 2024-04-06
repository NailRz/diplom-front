import { configureStore } from '@reduxjs/toolkit';
import {testData}  from '../features/testData/testDataSlice';
import {testStates} from '../features/testStatesSlice/testStatesSlice';

export default configureStore({
  reducer: {
    testData: testData.reducer,
    testStates: testStates.reducer,
  },
});
