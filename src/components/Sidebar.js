import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import LanguageIcon from '@material-ui/icons/Language';
import ChannelOption from './ChannelOption';
import firebase, { auth, firestore } from '../firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setChannels } from '../actions';

const Sidebar = () => {

    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels);

    const [user, loading] = useAuthState(auth);

    useEffect(() => {
      getChannels();
    }, []);

    const getChannels = async () => {
        await firestore.collection('rooms').orderBy('name', 'asc').onSnapshot((querySnapshot) => {
            if (querySnapshot) {
                console.log(querySnapshot)
                dispatch(setChannels(querySnapshot));
            }
        })
    };

    const addChannel = async () => {
        const newChannel = await prompt("Please enter a channel name");
        firestore.collection("rooms").doc().set({
            name: newChannel
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    };
  
    const renderChannels = () =>
        channels.docs.map(doc => {
            return <ChannelOption 
                key={doc.id} 
                id={doc.id} 
                title={doc.data().name} 
            />;
    });

    return (
        <SidebarContainer>
            {/* Search */}
            <SidebarSearchContainer>
                <SidebarSearch placeholder="Find or create a channel"/>
            </SidebarSearchContainer>
            {/* Channels */}
            <ChannelContainer>
                <ChannelHeader onClick={() => addChannel()}>
                    <ChannelHeaderText>Channels</ChannelHeaderText>
                    <AddIconStyled style={{ fontSize: 16 }}/>
                </ChannelHeader>
                {channels && channels.docs && renderChannels()} 
            </ChannelContainer>
            {/* Profile */}
            <ProfileContainer>
                <ImageContainer>
                    <Image src={user?.photoURL} />
                    <OnlineStatus />
                </ImageContainer>
                <UserInfo>
                    <Username>{user?.displayName}</Username>
                </UserInfo>
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
    cursor: pointer;
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
    align-items: center;
    margin-top: auto;
    width: 100%;
    height: 5.5rem;
    padding-left: 1.5rem;
    background-color: var(--dark-blue-5);
`;

const ImageContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    box-sizing: border-box;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    object-fit: cover;
`;

const OnlineStatus = styled.div`
    position: absolute;
    bottom: 0.6rem;
    right: -0.6rem;
    width: 1.3rem;
    height: 1.3rem;
    border: 0.25rem solid var(--dark-blue-5);
    border-radius: 50%;
    background-color: var(--green-1);
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const Username = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--white-1);
    padding-left: 1rem;
`;