import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components';
import { auth, firestore } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from 'react-spinkit';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';

const App = () => {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const userDoc = firestore.collection("users").doc(user.uid);
      
      // Store user information in db
      userDoc.set({
        id: user.uid,
        user: user.displayName,
        emailAddress: user.email,
        verified: user.emailVerified,
        online: new Date().getTime(),
        isOnline: false
      });

      // Maintain connection
      const fiveMinutes = 300000

      setInterval(() => {
        userDoc.set({
          online: new Date().getTime()
        }, { merge: true });
      }, fiveMinutes)

      userDoc.onSnapshot(doc => {
        const fiveMinutesAgo = new Date().getTime() - fiveMinutes
        console.log("Five minutes ago:", fiveMinutesAgo);
        console.log("Other data:", doc.data().online);
        const isOnline = doc.data().online > fiveMinutesAgo
        console.log("is online:", isOnline);
        console.log(isOnline)
        userDoc.set({
          isOnline: isOnline
        }, { merge: true });
      })
    }
  }, [user]);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img 
            src="https://i.ibb.co/hsJKp2Q/Chatter-Logo.png"
            alt="Chatter Logo"
          />

          <Spinner 
            name='ball-spin-fade-loader'
            color='#36393F'
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