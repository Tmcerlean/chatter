export const increment = () => {
    return {
        type: 'INCREMENT'
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT'
    };
};

export const signIn = () => {
    return {
        type: 'SIGN_IN'
    };
};

export const enterChannel = (id) => {
    return {
        type: 'ENTER_CHANNEL',
        payload: id
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