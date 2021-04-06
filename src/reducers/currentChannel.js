const channelReducer = (state = null, action) => {
    switch (action.type) {
        case 'ENTER_CHANNEL':
            return action.payload
        default:
            return state;
    }
}

export default channelReducer;