import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import LanguageIcon from '@material-ui/icons/Language';
import Channel from './Channel';

const Sidebar = () => {
    return (
        <SidebarContainer>
            {/* Search */}
            <SidebarSearchContainer>
                <SidebarSearch placeholder="Find or create a channel"/>
            </SidebarSearchContainer>
            {/* Global Channels */}
            <GlobalChannelContainer>
                <ChannelHeader>
                    <ChannelText>Global Channels</ChannelText>
                </ChannelHeader>
                <ChannelBlock>
                    <Channel Icon={LanguageIcon} />
                </ChannelBlock>
            </GlobalChannelContainer>
            {/* Custom Channels */}
            <CustomChannelContainer>
                <ChannelHeader>
                    <ChannelText>Custom Channels</ChannelText>
                    <AddIconStyled style={{ fontSize: 16 }}/>
                </ChannelHeader>
            </CustomChannelContainer>
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
    width: 20%;
    height: 100vh;
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

const GlobalChannelContainer = styled.div`
    width: 90%;
    height: 10px;
    margin-top: 1.25rem;
`;

const CustomChannelContainer = styled.div`
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

const ChannelText = styled.div`
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