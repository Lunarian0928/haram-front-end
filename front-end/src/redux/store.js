// store.js
import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerReducer';

const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
