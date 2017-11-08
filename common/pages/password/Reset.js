import React, { Component } from 'react'
import PasswordReset from '../../components//auth/PasswordReset'

class ResetPassword extends Component {
  render() {
    return (
      <div className="twoColumns">
        <div className="left resetBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>Choisir un nouveau mot de passe</h1>
            <PasswordReset />
          </div>
        </div>
      </div>
    )
  }
}

export default ResetPassword
