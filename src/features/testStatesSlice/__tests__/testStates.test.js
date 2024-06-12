/* eslint-disable no-undef */

import { configureStore } from '@reduxjs/toolkit';
import testStatesReducer, {
  updateIsTyping,
  updateIsTestComplete,
  updateIsTestInvalid,
  resetStates,
  selectIsTyping,
  selectIsTestComplete,
  selectIsTestInvalid,
} from '../testStatesSlice';

describe('testStates slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { testStates: testStatesReducer } });
  });

  it('должны поменять начальное состояние', () => {
    expect(store.getState().testStates).toEqual({
      isTestStart: false,
      isTestComplete: false,
      isTyping: false,
      isTestInvalid: false,
    });
  });

  it('смена состояния updateIsTyping', () => {
    store.dispatch(updateIsTyping(true));
    expect(store.getState().testStates.isTyping).toBe(true);
  });

  it('смена состояния  updateIsTestComplete', () => {
    store.dispatch(updateIsTestComplete(true));
    expect(store.getState().testStates.isTestComplete).toBe(true);
  });

  it('смена состояния  updateIsTestInvalid', () => {
    store.dispatch(updateIsTestInvalid(true));
    expect(store.getState().testStates.isTestInvalid).toBe(true);
  });

  it('смена состояния  resetStates', () => {
    store.dispatch(updateIsTyping(true));
    store.dispatch(updateIsTestComplete(true));
    store.dispatch(updateIsTestInvalid(true));

    store.dispatch(resetStates());

    expect(store.getState().testStates).toEqual({
      isTestStart: false,
      isTestComplete: false,
      isTyping: false,
      isTestInvalid: false,
    });
  });

  it('should select isTyping', () => {
    store.dispatch(updateIsTyping(true));
    const state = store.getState();
    expect(selectIsTyping(state)).toBe(true);
  });

  it('should select isTestComplete', () => {
    store.dispatch(updateIsTestComplete(true));
    const state = store.getState();
    expect(selectIsTestComplete(state)).toBe(true);
  });

  it('should select isTestInvalid', () => {
    store.dispatch(updateIsTestInvalid(true));
    const state = store.getState();
    expect(selectIsTestInvalid(state)).toBe(true);
  });
});