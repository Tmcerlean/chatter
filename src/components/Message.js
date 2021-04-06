import styled from 'styled-components';

const Message = ({name, timestamp, image, message}) => {
    return (
        <MessageContainer>
            <Image src={image}></Image>
            <MessageContent>
                <MessageInfo>
                    <Username>{name}</Username>
                    <Timestamp>05/04/2021</Timestamp>
                </MessageInfo>
                <MessageText>{message}</MessageText>
            </MessageContent>
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 1.5rem;
    border-bottom: 1px solid lightgrey;

    &:hover {
        background-color: var(--dark-blue-6);
    }
`;

const Image = styled.img`
    box-sizing: border-box;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    object-fit: cover;
`;

const MessageContent = styled.div`
    flex: 1;
    padding-left: 1.5rem;
`;

const MessageInfo = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const Username = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--white-1);
`;

const Timestamp = styled.div`
    font-size: 1.2rem;
    color: var(--light-grey-1);
    padding-left: 0.75rem;
`;

const MessageText = styled.div`
    font-size: 1.4rem;
    font-weight: 300;
    color: var(--white-1);
`;