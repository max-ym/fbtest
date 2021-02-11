import React, { Component } from 'react';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { isMobile } from "react-device-detect";

class Counter extends Component {
  constructor(props) {
    super(props);

    if (props.dev != 'Mobile' && props.dev != 'Desktop') {
      throw 'Unknown device: ' + props.dev;
    }

    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this.firebaseDoc().get().then((doc) => {
      if (doc.data() && doc.data().value) {
        this.setState({ time: doc.data().value });
      }

      if (this.isThisDevice()) {
        this.interval = setInterval(() => {
          this.setState({ time: this.state.time + 1 });
          this.updateDB();
        }, 1000);
      } else {
        this.setupListener();
      }
    });
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    let hrs = Math.floor(this.state.time / 3600);
    let min = Math.floor(this.state.time / 60) - hrs * 60;
    let sec = this.state.time % 60;

    hrs = (hrs + '').padStart(2, '0');
    min = (min + '').padStart(2, '0');
    sec = (sec + '').padStart(2, '0');

    return (
      <div className='box has-text-centered'>
        <h1 className='title'>{this.props.dev}</h1>
        <img className="mb-3" src="/pic.svg" alt="" />
        <p>{hrs}:{min}:{sec}</p>
      </div>
    );
  }

  isThisDevice() {
    let name = this.props.dev;
    if (name == 'Mobile') {
      return isMobile;
    } else if (name == 'Desktop') {
      return !isMobile;
    } else {
      throw 'unreachable';
    }
  }

  firebaseDoc() {
    const userId = firebase.auth().currentUser.uid;
    return firebase.firestore().collection(this.props.dev).doc(userId);
  }

  updateDB() {
    this.firebaseDoc().set({
      value: this.state.time
    });
  }

  setupListener() {
    this.firebaseDoc().onSnapshot((doc) => {
      if (!doc.data() || !doc.data().value) return;

      const newTime = doc.data().value;
      this.setState({ time: newTime });
    });
  }
}

export default Counter;
