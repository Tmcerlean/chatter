export const signIn = (user) => {
    return {
        type: 'SIGNED_IN',
        payload: user
    };
};

export const enterChannel = (id) => {
    return {
        type: 'ENTER_CHANNEL',
        payload: id
    };
};

export const storeChannel = (data) => {
    return {
        type: 'STORE_CHANNEL',
        payload: data
    };
};

export const setChannels = (channels) => {
    return {
        type: 'SET_CHANNELS',
        payload: channels
    };
};

export const setMessages = (messages) => {
    return {
        type: 'SET_MESSAGES',
        payload: messages
    };
};

export const setOnlineUsers = (users) => {
    return {
        type: 'SET_ONLINE_USERS',
        payload: users
    };
};