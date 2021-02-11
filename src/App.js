import React, { Component } from 'react';

import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';
import Counters from './components/Counters';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyCeLTXlp3iU-i718b13L87JlTa3Zm9Yifo",
  authDomain: "inntest-d0beb.firebaseapp.com",
  projectId: "inntest-d0beb",
  storageBucket: "inntest-d0beb.appspot.com",
  messagingSenderId: "228326643276",
  appId: "1:228326643276:web:f99048ea8a8d2b855d46e9"
});

class App extends Component {
  state = {
    isLogin: false
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLogin: user ? true : false });
    });
  }

  render() {
    return (
      <div className="container pt-5 mt-5">
        <Router>
          <Switch>
            <Route path='/login' render={() => this.state.isLogin ? <Redirect to="/" /> : <FormLogin />} />
            <Route path='/signup' render={() => this.state.isLogin ? <Redirect to="/" /> : <FormRegister />} />
            <Route exact path='/' render={() => !this.state.isLogin ? <Redirect to="/login" /> : <Counters />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
