import React from 'react';
import { Route } from 'react-router';

import requireAuth from './requireAuthHook'
import EnsureLoggedWrap from '../components/auth/EnsureLoggedWrap'

import AskPasswordReset from '../components/auth/AskPasswordReset.js';
import EmailSignIn from '../components/auth/EmailSignIn.js';
import EmailSignUp from '../components/auth/EmailSignUp.js';
import PasswordReset from '../components/auth/PasswordReset.js';
import UpdatePassword from '../components/auth/UpdatePassword.js';
import ValidateAccount from '../components/auth/ValidateAccount.js';

import { default as Morrison } from '../components/Morrison';

export default store => {
  const Login = () => (
    <div>
      <Morrison>
        <EmailSignIn />
      </Morrison>
    </div>
  )

  const Register = () => (
    <div>
      <Morrison>
        <EmailSignUp />
      </Morrison>
    </div>
  )
  const ChangePassword = () => (
    <div>
      <Morrison>
        <UpdatePassword />
      </Morrison>
    </div>
  )
  const ValidateAccount = () => (
    <div>
      <Morrison>
        <ValidateAccount />
      </Morrison>
    </div>
  )
  const ResetPassword = () => (
    <div>
      <Morrison>
        <PasswordReset />
      </Morrison>
    </div>
  )

  const RecoverPassword = () => (
    <div>
      <Morrison>
        <AskPasswordReset />
      </Morrison>
    </div>
  )

  return (
    <Route>
      <Route component={EnsureLoggedWrap}>
        <Route path="change-password" component={ChangePassword} onEnter={requireAuth.bind(this, store)} />
      </Route>
      <Route path="reset-password" component={() => (<ResetPassword />)} />
      <Route path="recover-password" component={RecoverPassword} />
      <Route path="register" component={Register} />
      <Route path="validate-account" component={ValidateAccount} />
      <Route path="login" component={() => (<Login />)} />
    </Route>
  )
}
