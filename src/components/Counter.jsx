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
}

export default Counter;
