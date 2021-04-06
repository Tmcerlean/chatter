import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../firebase';
import { setMessages } from '../actions';
import Message from './Message';

const Chat = () => {

    const dispatch = useDispatch();
    const currentChannel = useSelector((state) => state.currentChannel);
    const messages = useSelector((state) => state.messages);

    useEffect(() => {
        console.log(currentChannel);
        getMessages();
    }, [currentChannel]);

    const getMessages = async () => {
        if (currentChannel) {
            const snapShot = await firestore.collection('rooms').doc(currentChannel).collection('messages').orderBy('timestamp', 'asc').get();
            dispatch(setMessages(snapShot));
        } else {
            return
        }  
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

    const getChannelName = () => {
        if (currentChannel) {

            const channel = firestore.collection("rooms").doc(currentChannel);

            channel.get().then((doc) => {
                if (doc.exists) {
                    console.log(doc.data().name)
                    return doc.data().name;
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }


    

    return (
        <ChatContainer>
            <ChatHeaderContainer>
                <ChatHeaderText>#{getChannelName()}</ChatHeaderText>
            </ChatHeaderContainer>
            <ChatBodyContainer>
                <ChatMessages>
                    {messages && messages.docs && renderMessages()} 
                </ChatMessages>
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
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: calc(100vh - 5.5rem);
    border-bottom: 0.1rem solid var(--dark-blue-4);
`;

const ChatMessages = styled.div`
    width: 100%;
`;

