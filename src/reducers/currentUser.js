const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SIGNED_IN':
            return action.payload
        default:
            return state;
    }
}

export default userReducer;