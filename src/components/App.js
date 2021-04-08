import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import Spinner from 'react-spinkit';

const App = () => {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img 
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />

          <Spinner 
            name='ball-spin-fade-loader'
            color='purple'
            fadeIn='none'
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
      <Main>
        <Sidebar />
        <Switch>
          <Route path="/" exact>
            <Chat />
          </Route>
        </Switch>
      </Main>
      )}
    </Router>
  );
};

export default App;

const Main = styled.main`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  display: flex;
  text-align: center;
  padding-bottom: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;