const initialState = {
  label: "유일한 진정한 행복은 목적을 위해 몰입하는 데서 온다",
  initialDuration: {
    hr: 0,
    min: 1,
    sec: 0,
  },
  duration: {
    hr: 0,
    min: 1,
    sec: 0,
  },
  isRunning: false,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INITIAL_DURATION':
      return {
        ...state,
        initialDuration: action.payload,
      };
  
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      };
      
    case 'SET_IS_RUNNING':
      return {
        ...state,
        isRunning: action.payload,
      };

    case 'RESET_TIMER':
      return {
        ...state,
        duration: { ...state.initialDuration }, 
        isRunning: false
      };
    case 'SET_LABEL':
      return {
        ...state,
        label: action.payload,
      }
    default:
      return state;
  }
};

export default timerReducer;
