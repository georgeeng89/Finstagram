import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login, demo } from '../../store/session';

import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-container'>
      <div className='image-container'>

        <img id='login-form-img' src='/static/login_logo.png' />

      </div>

      <div className='login-form-container'>

        <form className='login-form' onSubmit={onLogin}>
          <div>
            <img className='logo login-page' src='/static/finstagram_logo.png' />
          </div>
          <div className='comment-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error.split(':')[1]}</div>
            ))}
          </div>
          <div>
            {/* <label htmlFor='email'>Email</label> */}
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div>

            <button className='login-button' type='submit'>Login</button>
            <button className='login-button' type='button' onClick={() => dispatch(demo())}>
              Login as demo
            </button>
          </div>
        </form>

        <div className='signup-container'>
          <span className='login-page-text'>Don't have an account?</span>
          <Link className='page-link' to='/sign-up'>
            Signup
          </Link>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
