import styled from 'styled-components';
import ForumIcon from '@material-ui/icons/Forum';
import { useDispatch, useSelector } from 'react-redux';
import { enterChannel } from '../actions';

// If icon received in props then display the icon and the title
// Otherwise display hash and the title

const ChannelOption = ({ Icon, id, title }) => {

    const dispatch = useDispatch();

    const setChannel = () => {
        console.log(id);
        dispatch(enterChannel(id));
    }

    return (
        <Channel onClick={() => setChannel()}>
            {Icon && <Icon fontSize='medium'/>}
            {Icon ? (
                <ChannelText>{title}</ChannelText>
            ) : (
                <ChannelText><ForumIconStyled />{title}</ChannelText>
            )}
        </Channel>
    )
}

export default ChannelOption;

const Channel = styled.div`
    display: flex;
    font-size: 1.2rem;
    color: var(--light-grey-1);
    cursor: pointer;
    padding: 0.5rem 0;
    
    &:hover {
        background-color: var(--dark-blue-1);
        color: white;
    }
`;

const ChannelText = styled.div`
    display: flex;
    align-items: center;
`;

const ForumIconStyled = styled(ForumIcon)`
    margin-right: 0.5rem;
`;