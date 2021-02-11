import { Fragment } from "react";

import firebase from "firebase/app";
import "firebase/auth";

import Counter from './Counter';

const Counters = () => {
  const logout = () => {
    firebase.auth().signOut();
  }

  return (
    <Fragment>
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <div className="column is-12 has-text-right pb-5">
            <a onClick={logout}>Log out</a>
          </div>
          <div className="columns">
            <div className="column is-6">
              <Counter className='column' dev='Desktop' />
            </div>
            <div className="column is-6">
              <Counter className='column' dev='Mobile' />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Counters;
