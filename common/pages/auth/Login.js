import React, { Component } from 'react'
import { Link } from 'react-router'
import EmailSignIn from '../../components//auth/EmailSignIn'

class Login extends Component {
  render() {
    return (
      <div className="twoColumns">
        <div className="left loginBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>Login</h1>
            <EmailSignIn />
            <p><Link to="recover-password">Mot de passe oublié ?</Link></p>
            <p>Pas encore de compte ? <Link to="register">S'inscrire !</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
