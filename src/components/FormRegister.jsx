import React, { Component } from 'react';
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";

class FormRegister extends Component {
  state = {
    email: '123',
    password: '',
    firstName: '',
    lastName: ''
  };

  changeEmail = event => {
    this.setState({ email: event.target.value });
  }

  changePassword = event => {
    this.setState({ password: event.target.value });
  }

  changeFirstName = event => {
    this.setState({ firstName: event.target.value });
  }

  changeLastName = event => {
    this.setState({ lastName: event.target.value });
  }

  handleSubmit = event => {
    const { email, password } = this.state;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = firebase.auth().currentUser.uid;
        firebase.firestore().collection('Users').doc(userId).set({
          firstName: this.state.firstName,
          lastName: this.state.lastName
        });
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
            <h1 className='title'>Sign up</h1>

            <input className='input my-2' type='text' id='firstName' placeholder='First name' onChange={this.changeFirstName} />
            <input className='input my-2' type='text' id='lastName' placeholder='Last name' onChange={this.changeLastName} />
            <input className='input my-2' type='text' type='email' placeholder='Email' onChange={this.changeEmail} />
            <input className='input my-2' type='text' type='password' placeholder='Password' onChange={this.changePassword} />
            <button className='button is-primary my-4' type='submit'>Sign Up</button>

            <p className='subtext my'>Already signed up? <Link className='subtext-black' to='/login'>Log in</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

export default FormRegister;
