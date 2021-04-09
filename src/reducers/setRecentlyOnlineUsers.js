const setRecentlyOnlineUsersReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_RECENTLY_ONLINE_USERS':
            return action.payload
        default:
            return state;
    }
}

export default setRecentlyOnlineUsersReducer;