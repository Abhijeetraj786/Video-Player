import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function SigninScreen(props) {
  const [emailOrMob, setEmailORMob] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
console.log(props);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: sign in action
    dispatch(signin(emailOrMob, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox/> }
        {error && <MessageBox variant = "danger">{error}</MessageBox> }
        <div>
          <label htmlFor="email">Email Address / Mobile Number</label>
          <input
            type="tel"
            id="email"
            placeholder="Enter Email / Mobile Number"
            required
            onChange={(e) => setEmailORMob(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
          New Customer?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Create Your Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}