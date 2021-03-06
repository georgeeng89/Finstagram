import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import PhotoList from './components/PhotoList';
import ProfileDetails from './components/ProfileDetails';
import PageNotFound from './components/PageNotFound';
import AboutFooter from './components/AboutFooter';

import { authenticate } from './store/session';
import { getPhotos } from './store/photo';
import { getComments } from './store/comment'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getPhotos());
      await dispatch(getComments())

      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AboutFooter />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/' exact={true} >
          <PhotoList />
        </ProtectedRoute>
        <Route path='/home' exact={true}>
          <PhotoList />
        </Route>
        <Route path='/profile/:userId' exact={true}>
          <ProfileDetails />
        </Route>
        <Route path='/404' exact={true}>
          <PageNotFound />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
