import React, { Component } from 'react'
import { Link } from 'react-router'
import ValidateAccount from '../../components//auth/ValidateAccount'

class AccountValidate extends Component {
  render() {
    return (
      <div className="2-columns">
        <div className="left"></div>
        <div className="right">
          <div className="right-content">
            <h1>Validation de votre compte :)</h1>
            <ValidateAccount />
            <p><Link to="login">Se connecter</Link></p>
            <p><Link to="recover">Mot de passe oublié ?</Link></p>
            <p>Pas encore de compte ? <Link to="register">S'inscrire !</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountValidate
