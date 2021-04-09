import styled from 'styled-components';

const NoChat = () => {
    return (
        <NoChatContainer>
            <NoChatContent>
                <NoChatHeader>Chatter.</NoChatHeader>
                <NoChatSubHeader>Please select a channel</NoChatSubHeader>
            </NoChatContent>
        </NoChatContainer>
    )
}

export default NoChat

const NoChatContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: var(--dark-blue-3);
`;

const NoChatContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: auto;
`;

const NoChatHeader = styled.h2`
    text-align: center;
    width: 100%;
    font-size: 15rem;
    color: var(--dark-blue-5);
`;

const NoChatSubHeader = styled.h3`
    text-align: center;
    width: 100%;
    font-size: 5rem;
    color: var(--dark-blue-5);
`;