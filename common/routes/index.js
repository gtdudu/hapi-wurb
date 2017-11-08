import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

// redirect to login if not logged
// import requireAuth from './requireAuthHook'

// authorization helper and component
import authRoutes from './auth'
import EnsureLoggedWrap from '../components/auth/EnsureLoggedWrap'

import { default as Canard } from '../components/Canard';
import { default as Morrison } from '../components/Morrison';
import { default as Magnetic } from '../components/Magnetic';
import Header from '../components/header/Header.js';
import Grids from '../components/grids/';
import List1 from '../components/lists/list1';
import Items from '../components/items/';
import Account from '../components/account/Account.js';
import UpdatePasswordForm from '../components/auth/UpdatePassword.js';

// import {
//   getAccount,
//   getAccounts,
// } from "../actions/account/account";

export default store => {
  const NotFound = () => (
    <Magnetic>
      <Header></Header>
      404
    </Magnetic>
  )
  const Home = () => (
    <Magnetic>
      <Header></Header>
      WELCOME
      <Grids.grid2 />
    </Magnetic>
  )

  const Blog = () => (
    <Magnetic>
      <Header></Header>
      <Grids.grid2 />
      <Items.fullPage />
      <Grids.grid2 />

      <Items.fullPage />
    </Magnetic>
  )

  const Dashboard = () => (
    <Magnetic>
      <EnsureLoggedWrap>
        Dashboard
        <List1 />
      </EnsureLoggedWrap>
    </Magnetic>
  )

  const Profile = () => (
    <Magnetic>
      <EnsureLoggedWrap>
        Profile
        <Account />
        <UpdatePasswordForm />
      </EnsureLoggedWrap>
    </Magnetic>
  )

  const Project = () => (
   <div>
     <Morrison>
        <Grids.grid1 />
     </Morrison>
   </div>
  )

  const Contact = () => (
    <Magnetic>
      CONTACT
    </Magnetic>
  )

  return (
    <Route path="/" >
      <IndexRoute component={Home} />
      {authRoutes(store)}
      <Route path="home" component={Home} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="profile" component={Profile} />
      <Route path="canard" component={Canard} />
      <Route path="blog" component={Blog} />
      <Route path="contact" component={Contact} />
      <Route path="project" component={Project} />
      <Route path="/404" component={NotFound} />
      <Redirect from="*" to="/404" />
    </Route>
  );
}
