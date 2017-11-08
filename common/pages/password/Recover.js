import React, { Component } from 'react'
import { Link } from 'react-router'
import AskPasswordReset from '../../components//auth/AskPasswordReset.js'

class RecoverPassword extends Component {
  render() {
    return (
      <div className="twoColumns">
        <div className="left recoverBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>Vous avez oublié votre mot de passe ?</h1>
            <AskPasswordReset />
            <p>Ça me revient. <Link to="login">Se connecter !</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

export default RecoverPassword
