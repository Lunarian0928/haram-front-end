const initialState = {
    reminderEls: [],
};

const reminderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REMINDER_ELS':
            return {
                ...state,
                reminderEls: action.payload,
            };
        default:
            return state;
    }
};

export default reminderReducer;