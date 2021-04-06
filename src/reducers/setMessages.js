const setMessagesReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            console.log(action.payload)
            return action.payload
        default:
            return state;
    }
}

export default setMessagesReducer;