const channelReducer = (state = null, action) => {
    switch (action.type) {
        case 'ENTER_CHANNEL':
            console.log("CALLED")
            return action.payload
        default:
            return state;
    }
}

export default channelReducer;