
import React from 'react';
import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
// import AddPhotoForm from './AddPhotoForm';
import { useSelector } from 'react-redux';

import './AboutFooter.css'


const AboutFooter = () => {

  const user = useSelector(state => state.session.user);

  return (
    <nav>
      <ul className='footer-bar'>

        <div className='about-me-container'>
          Developed By: George Eng
        </div>
        <div className='about-me-icons'>
          <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/george-eng-4b07631a5/">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
        <div className='about-me-icons'>
          <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/georgeeng89">
            <i class="fab fa-github-square"></i>
          </a>
        </div>

      </ul>
    </nav>
  );
}

export default AboutFooter;
