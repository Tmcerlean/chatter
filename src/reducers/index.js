import channelReducer from './currentChannel';
import channelInfoReducer from './currentChannelInfo';
import userReducer from './currentUser';
import setChannelsReducer from './setChannels';
import setMessagesReducer from './setMessages';
import setOnlineUsersReducer from './setOnlineUsers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    currentChannel: channelReducer,
    currentChannelInfo: channelInfoReducer,
    currentUser: userReducer,
    channels: setChannelsReducer,
    messages: setMessagesReducer,
    onlineUsers: setOnlineUsersReducer
});

export default rootReducer;
