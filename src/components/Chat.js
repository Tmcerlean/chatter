import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../firebase';
import { setMessages, storeChannel } from '../actions';
import Message from './Message';
import ChatInput from './ChatInput';

const Chat = () => {

    const chatInputRef = useRef(null);
    const dispatch = useDispatch();
    const currentChannel = useSelector((state) => state.currentChannel);
    const currentChannelInfo = useSelector((state) => state.currentChannelInfo);
    const messages = useSelector((state) => state.messages);

    useEffect(() => {
        getMessages();
        getChannelName();
    }, [currentChannel]);

    useEffect(() => {
        chatInputRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

    const getMessages = async () => {
        if (currentChannel) {
            await firestore.collection('rooms').doc(currentChannel).collection('messages').orderBy('timestamp', 'asc').onSnapshot((querySnapshot) => {
                if (querySnapshot) {
                    dispatch(setMessages(querySnapshot));
                } else {
                    return
                }
            })
        };
    };

    const renderMessages = () =>
    messages.docs.map(doc => {
        return <Message 
            key={doc.id} 
            id={doc.id} 
            name={doc.data().name} 
            timestamp={doc.data().timestamp} 
            image={doc.data().image} 
            message={doc.data().message} 
        />;
    });

    const getChannelName = async () => {
        if (currentChannel) {

            const channel = await firestore.collection("rooms").doc(currentChannel);

            channel.get().then((doc) => {
                if (doc.exists) {
                    dispatch(storeChannel(doc.data()));
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        };
    };

    return (
        <ChatContainer>
            <ChatHeaderContainer>
                <ChatHeaderText>#{currentChannelInfo?.name}</ChatHeaderText>
            </ChatHeaderContainer>
            <ChatBodyContainer>
                <ChatMessages>
                    {messages && messages.docs && renderMessages()} 
                    <ChatBottom ref={chatInputRef} />
                </ChatMessages>
                <ChatInput chatInputRef={ chatInputRef } />
            </ChatBodyContainer>
        </ChatContainer>
    )
}

export default Chat;

const ChatContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100%;
    background-color: var(--dark-blue-3);
`;

const ChatHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 5.5rem;
    border-bottom: 0.1rem solid var(--dark-blue-4);
`;

const ChatHeaderText = styled.div`
    margin-left: 1rem;
    font-size: 1.4rem;
    font-weight: 900;
    color: var(--white-1);
`;

const ChatBodyContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: calc(100vh - 5.5rem);
    border-bottom: 0.1rem solid var(--dark-blue-4);
    overflow-y: scroll;
`;

const ChatMessages = styled.div`
    width: 100%;
`;

const ChatBottom = styled.div`
    padding-bottom: 10rem;
`;