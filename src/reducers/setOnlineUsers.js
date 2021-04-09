const setOnlineUsersReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ONLINE_USERS':
            return action.payload
        default:
            return state;
    }
}

export default setOnlineUsersReducer;