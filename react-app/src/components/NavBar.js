
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import AddPhotoForm from './AddPhotoForm';
import { useSelector } from 'react-redux';



const NavBar = () => {

  const user = useSelector(state => state.session.user);

  return (
    <nav>
      <ul className='nav-bar'>

        <div>

          <NavLink to='/home' exact={true} activeClassName='active'>
            <a href='/home' className='logo'><img className='logo' src='/static/finstagram_logo.png' alt='Finstagram Logo'/></a>
          </NavLink>

        </div>

        {!user &&
          (
            <>
              <div className='login-nav'>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </div>
              <div className='logout-button'>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </div>

            </>
          )
        }

        {user &&
          (
            <>
              <div>
                {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
                {/* + */}
                <AddPhotoForm />
              </div>
              <div className='logout-button'>
                <LogoutButton />
              </div>
            </>
          )
        }

      </ul>
    </nav>
  );
}

export default NavBar;
