import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { increment, decrement, signIn } from '../actions';
import { firestore } from '../firebase';
import Chat from './Chat';
import Sidebar from './Sidebar';

const App = () => {

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLogged);

  useEffect(() => {
    firestore.collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }, [counter]);

  return (
    <Router>
      <Main>
        <Sidebar />
        <Switch>
          <Route path="/" exact>
            <Chat />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
};

export default App;

const Main = styled.main`
  display: flex;
  height: 100vh;
`;