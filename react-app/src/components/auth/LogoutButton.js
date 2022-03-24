import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory, useParams } from 'react-router-dom';

import './LogoutButton.css'

const LogoutButton = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(logout());

    history.push('/login')
  };

  return <div onClick={onLogout}><i class="fas fa-sign-out-alt logout-button"></i></div>;
};

export default LogoutButton;
