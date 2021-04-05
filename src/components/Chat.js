import styled from 'styled-components';
import { firestore } from '../firebase';

const Chat = () => {

    // Get current room from redux
    // Get messages in room via firestore

    // firestore
    // .collection('levels')
    // .where('id', '==', currentLevel) // Make this currentLevel
    // .get()

    // const chatMessages = levels.map((level) => {
    //     return (
    //         <Link to="/game" onClick={() => setCurrentLevel(level.id)}>
    //             <Card key={level.id} level={level} getCharacterImage={getCharacterImage} />
    //         </Link>
    //     );
    // });

    return (
        <ChatContainer>
            <ChatHeaderContainer>
                <ChatHeaderText>#CurrentChannel</ChatHeaderText>
            </ChatHeaderContainer>
            <ChatBodyContainer>

            </ChatBodyContainer>
        </ChatContainer>
    )
}

export default Chat;

const ChatContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
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
    
`;