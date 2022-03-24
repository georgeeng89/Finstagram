
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


        </div>


        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            <a href='/' className='logo'><img className='logo' src='/static/finstagram_logo.png' alt='Finstagram Logo' /></a>
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
              <div className='navbar-link-icons'>
                {/* + */}
                <AddPhotoForm />
                <NavLink to={`/profile/${user.id}`} exact={true} activeClassName='active'>
                  <i class="fas fa-user-circle user-profile-circle"></i>
                </NavLink>
                <NavLink to={`/`} exact={true} activeClassName='active'>
                  <svg aria-label="Home" className="home-button" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
                </NavLink>
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
