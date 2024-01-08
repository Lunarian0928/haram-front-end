import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerReducer';
import reminderReducer from './reminderReducer'; 

const store = configureStore({
  reducer: {
    timer: timerReducer,
    reminder: reminderReducer,
  },
});

export default store;
