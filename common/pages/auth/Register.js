import React, { Component } from 'react'
import { Link } from 'react-router'
import EmailSignUp from '../../components//auth/EmailSignUp'

class Register extends Component {
  render() {
    return (
      <div className="twoColumns">
        <div className="left registerBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>S'inscrire</h1>
            <EmailSignUp />
            <p>Vous avez déjà un compte ? <Link to="login">Se connecter !</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
