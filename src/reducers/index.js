import counterReducer from './counter';
import loggedReducer from './isLogged';
import channelReducer from './currentChannel';
import channelInfoReducer from './currentChannelInfo';
import setChannelsReducer from './setChannels';
import setMessagesReducer from './setMessages';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    currentChannel: channelReducer,
    currentChannelInfo: channelInfoReducer,
    channels: setChannelsReducer,
    messages: setMessagesReducer
});

export default rootReducer;
