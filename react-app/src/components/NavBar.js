
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import AddPhotoForm from './AddPhotoForm';

const NavBar = () => {
  return (
    <nav>
      <ul className='nav-bar'>

        <div>
          <NavLink to='/home' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        <div>
          {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
          {/* + */}
          <AddPhotoForm />
        </div>
        <div className='logout-button'>
          <LogoutButton/>
        </div>

      </ul>
    </nav>
  );
}

export default NavBar;
