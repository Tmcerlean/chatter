const setChannelsReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_CHANNELS':
            console.log(action.payload)
            return action.payload
        default:
            return state;
    }
}

export default setChannelsReducer;