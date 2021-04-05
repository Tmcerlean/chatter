import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import LanguageIcon from '@material-ui/icons/Language';
import ChannelOption from './ChannelOption';
import { firestore } from '../firebase';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChannels } from '../actions';

const Sidebar = () => {

    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels);

    // const [channels, setChannels] = useState();
    useEffect(() => {
      getChannels();
    }, []);

    const getChannels = async () => {
      const snapShot = await firestore.collection('rooms').get()
      dispatch(setChannels(snapShot));
    };
  
    const renderChannels = () =>
        channels.docs.map(doc => {
            return <ChannelOption title={doc.data().name} key={doc.id} id={doc.id} />;
    });

    return (
        <SidebarContainer>
            {/* Search */}
            <SidebarSearchContainer>
                <SidebarSearch placeholder="Find or create a channel"/>
            </SidebarSearchContainer>
            {/* Channels */}
            <ChannelContainer>
                <ChannelHeader>
                    <ChannelHeaderText>Channels</ChannelHeaderText>
                    <AddIconStyled style={{ fontSize: 16 }}/>
                </ChannelHeader>
                {channels && channels.docs && renderChannels()} 
            </ChannelContainer>
            {/* Profile */}
            <ProfileContainer>

            </ProfileContainer>
        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 30rem;
    background-color: var(--dark-blue-2);
`;

const SidebarSearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5.5rem;
    border-bottom: 0.1rem solid var(--dark-blue-4);
`;

const SidebarSearch = styled.input`
    display: flex;
    width: 90%;
    height: 3rem;
    padding-left: 1rem;
    border: none;
    border-radius: .4rem;
    background-color: var(--dark-blue-4);
    font-size: 1.4rem;
`;

const ChannelContainer = styled.div`
    width: 90%;
    height: 10px;
    margin-top: 1.25rem;
`;

const ChannelHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const ChannelBlock = styled.div`
`;

const ChannelHeaderText = styled.div`
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 900;
    color: var(--light-grey-1);
`;

const AddIconStyled = styled(AddIcon)`
    display: flex;
    margin-left: auto;
    color: var(--light-grey-1);
`;

const ProfileContainer = styled.div`
    display: flex;
    margin-top: auto;
    width: 100%;
    height: 5.5rem;
    background-color: var(--dark-blue-5);
`;