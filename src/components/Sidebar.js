import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import ChannelOption from './ChannelOption';
import UserOption from './UserOption';
import { auth, firestore } from '../firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setChannels, setOnlineUsers, setRecentlyOnlineUsers } from '../actions';

const Sidebar = () => {

    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels);
    const onlineUsers = useSelector((state) => state.onlineUsers);
    const recentlyOnlineUsers = useSelector((state) => state.recentlyOnlineUsers);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
      getChannels();
      getUsers();
    }, []);

    const getChannels = async () => {
        await firestore.collection('rooms').orderBy('name', 'asc').onSnapshot((querySnapshot) => {
            if (querySnapshot) {
                console.log(querySnapshot)
                dispatch(setChannels(querySnapshot));
            }
        })
    };

    const getUsers = async () => {

        const fiveMinutes = 300000;
        const twentyFourHours = 86400000;

        const onlineNowTimestamp = new Date().getTime() - fiveMinutes;
        const lastDayTimestamp = new Date().getTime() - twentyFourHours;

        await firestore.collection('users').where('online', '>', lastDayTimestamp).orderBy('online', 'asc').onSnapshot((querySnapshot) => {
            if (querySnapshot) {

                let onlineNow = [];
                let recentlyOnline = [];

                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().online > onlineNowTimestamp) {
                        onlineNow.push(documentSnapshot);
                    } else {
                        recentlyOnline.push(documentSnapshot);
                    }
                });
                dispatch(setOnlineUsers(onlineNow));
                dispatch(setRecentlyOnlineUsers(recentlyOnline));
            };
        });
    };

    const addChannel = async () => {

        const newChannel = await prompt("Please enter a channel name");

        await firestore.collection('rooms').where('name', '==', newChannel).get().then((querySnapshot) => {
            if (querySnapshot.docs.length > 0) {
                alert("Channel already exists, please try again!")
                return;
            } else if (newChannel === '') {
                alert("You did not enter a channel name, please try again!")
                return;
            }
            firestore.collection("rooms").doc().set({
                name: newChannel
            })
            .then(() => {
                console.log("Channel created!");
            })
            .catch((error) => {
                console.error("Error creating channel: ", error);
            });
        }).catch((error) => {
            console.log("Error creating channel:", error);
        });
    };
  
    const renderChannels = () => {
        let channelList = channels.docs.map(doc => {
            return <ChannelOption 
                key={doc.id} 
                id={doc.id} 
                title={doc.data().name} 
            />;
        })
        return channelList;
    };

    const renderOnlineUsers = () => {
        let userList = onlineUsers.map(doc => {
            return <UserOption 
                key={doc.id} 
                id={doc.id}
                user={doc.data().user}
                icon="var(--green-1)"
            />;
        })
        return userList;
    };

    const renderRecentlyOnlineUsers = () => {
        let userList = recentlyOnlineUsers.map(doc => {
            return <UserOption 
                key={doc.id} 
                id={doc.id}
                user={doc.data().user}
                icon="var(--orange-1)"
            />;
        })
        return userList;
    };

    return (
        <SidebarContainer>
            <SidebarLogoContainer>
                <SidebarLogo>Chatter.</SidebarLogo>
            </SidebarLogoContainer>
            <ChannelContainer>
                <ChannelHeader onClick={() => addChannel()}>
                    <ChannelHeaderText>Channels</ChannelHeaderText>
                    <AddIconStyled style={{ fontSize: 16 }}/>
                </ChannelHeader>
                {channels && channels.docs && renderChannels()} 
            </ChannelContainer>
            <UserContainer>
                <UserHeader>
                    <UserHeaderText>Users</UserHeaderText>
                </UserHeader>
                {onlineUsers && onlineUsers[0] && renderOnlineUsers()}
                {recentlyOnlineUsers && recentlyOnlineUsers[0] && renderRecentlyOnlineUsers()}
            </UserContainer>
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

const SidebarLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5.5rem;
    border-bottom: 0.1rem solid var(--dark-blue-4);
`;

const SidebarLogo = styled.h1`
    font-size: 3rem;
    color: var(--light-grey-1);
`;

const ChannelContainer = styled.div`
    width: 90%;
    height: 40%;
    margin-top: 1.25rem;
    margin-bottom: 3rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 1rem;
        background: var(--dark-blue-8);
        border-radius: 1rem;
        padding-right: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background: var(--dark-blue-4);
    }
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

const UserContainer = styled.div`
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 90%;
    height: 40%;
    margin-bottom: 3rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 1rem;
        background: var(--dark-blue-8);
        border-radius: 1rem;
        padding-right: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background: var(--dark-blue-4);
    }
`;

const UserHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const UserHeaderText = styled.div`
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 900;
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