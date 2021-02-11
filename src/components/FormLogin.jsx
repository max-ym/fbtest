import React, { Component } from 'react';
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";

class FormLogin extends Component {
  state = {
    email: '',
    password: ''
  };

  changeEmail = event => {
    this.setState({ email: event.target.value });
  }

  changePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
      })
      .catch((error) => {
        alert(error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="columns is-mobile">
        <form className='column is-half is-offset-one-quarter' onSubmit={this.handleSubmit}>
          <div className="box">
            <h1 className='title'>Login</h1>

            <input className='input my-2' type='email' placeholder='Email' onChange={this.changeEmail} />
            <input className='input my-2' type='password' placeholder='Password' onChange={this.changePassword} />
            <button className='button is-primary my-4' type='submit'>Login</button>

            <p className='subtext'>Don't have an account yet? <Link className='subtext-black' to='/signup'>Sign up</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

export default FormLogin;
