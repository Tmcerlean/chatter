const channelInfoReducer = (state = null, action) => {
    switch (action.type) {
        case 'STORE_CHANNEL':
            return action.payload
        default:
            return state;
    }
}

export default channelInfoReducer;