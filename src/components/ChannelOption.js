import styled from 'styled-components';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useDispatch } from 'react-redux';
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
                <ChannelText><ArrowRightIcon />{title}</ChannelText>
            )}
        </Channel>
    )
}

export default ChannelOption;

const Channel = styled.div`
    display: flex;
    padding: 0.5rem 0;
    font-size: 1.2rem;
    color: var(--light-grey-1);
`;

const ChannelText = styled.div`
    display: flex;
    padding-left: 0.5rem;
`;