import styled from 'styled-components';

const ChannelOption = ({ user }) => {

    return (
        <User>
            { user }
        </User>
    )
}

export default ChannelOption;

const User = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: var(--light-grey-1);
    cursor: pointer;
    padding: 0.5rem 0;
    
    &:hover {
        background-color: var(--dark-blue-1);
        color: white;
    }
`;
