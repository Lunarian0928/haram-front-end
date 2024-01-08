// actions.js

export const setInitialDuration = (initialDuration) => ({
  type: 'SET_INITIAL_DURATION',
  payload: initialDuration,
});

export const setDuration = (duration) => ({
  type: 'SET_DURATION',
  payload: duration,
});

export const setIsRunning = (isRunning) => ({
  type: 'SET_IS_RUNNING',
  payload: isRunning,
});

export const resetTimer = () => ({
  type: 'RESET_TIMER',
});

export const setReminderEls = (reminderEls) => ({
  type: 'SET_REMINDER_ELS',
  payload: reminderEls,
});