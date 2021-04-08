import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import firebase, { auth, firestore } from '../firebase';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

const ChatInput = ({ chatInputRef }) => {

    const [responseInput, setResponseInput] = useState('');
    const [user, loading] = useAuthState(auth);

    const currentChannel = useSelector((state) => state.currentChannel);

    const submitMessage = (e) => {
        e.preventDefault();
        firestore.collection('rooms').doc(currentChannel).collection('messages').add({
            message: responseInput,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL
        });

        chatInputRef.current.scrollIntoView({
            behavior: 'smooth',
        });

        setResponseInput('');
    };

    return (
        <ChatResponseContainer>
            <ChatResponseForm action=''>
                <ChatResponseInput 
                    value={responseInput}
                    placeholder="Message channel"
                    onChange={e => setResponseInput(e.target.value)} 
                />
                <ChatResponseImageAttachButton style={{ fontSize: 24 }}/>
                <ChatResponseSubmitButton 
                    hidden 
                    type='submit' 
                    onClick={submitMessage} 
                />
            </ChatResponseForm>
        </ChatResponseContainer>
    )
}

export default ChatInput;

const ChatResponseContainer = styled.div`
    position: fixed;
    bottom: 0;
    height: 5rem;
    width: calc(100% - 30rem - 3rem);
    margin: 1.5rem;
    border-radius: 0.75rem;
    background-color: var(--dark-blue-7);
`;

const ChatResponseForm = styled.form`
`;

const ChatResponseInput = styled.input`
    background-color: transparent;
    border: none;
    height: 5rem;
    width: 95%;
    color: var(--white-1);
    caret-color: var(--white-1);
    text-indent: 1.5rem;

    &::placeholder {
        font-size: 1.6rem;
    }

    &:focus {
        outline: none;
    }
`;

const ChatResponseImageAttachButton = styled(InsertPhotoIcon)`
    position: absolute;
    right: 1.5rem;
    top: 1.4rem;
    color: var(--light-grey-2);
    cursor: pointer;

    &:hover {
        color: var(--light-grey-3);
    }
`;

const ChatResponseSubmitButton = styled.button`
`;
