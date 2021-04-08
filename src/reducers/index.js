import channelReducer from './currentChannel';
import channelInfoReducer from './currentChannelInfo';
import userReducer from './currentUser';
import setChannelsReducer from './setChannels';
import setMessagesReducer from './setMessages';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    currentChannel: channelReducer,
    currentChannelInfo: channelInfoReducer,
    currentUser: userReducer,
    channels: setChannelsReducer,
    messages: setMessagesReducer
});

export default rootReducer;
