import styled from 'styled-components';

const ChannelOption = ({ user, icon }) => {

    return (
        <User>
            <Username>{ user }</Username>
            <UserOnlineStatus style={{ backgroundColor: icon }}/>
        </User>
    )
}

export default ChannelOption;

const User = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3.5rem;
    cursor: pointer;
    padding: 0.5rem 0;
    
    &:hover {
        background-color: var(--dark-blue-1);
        color: white;
    }
`;

const UserOnlineStatus = styled.div`
    position: absolute;
    right: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: var(--green-1);
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const Username = styled.div`
    font-size: 1.2rem;
    color: var(--light-grey-1);
`;
