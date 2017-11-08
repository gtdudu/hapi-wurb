import React, { Component } from 'react'
import UpdatePassword from '../../components/auth/UpdatePassword.js'

class ChangePassword extends Component {
  render() {
    return (
      <div className="twoColumns">
        <div className="left changePwdBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>Changer de mot de passe</h1>
            <UpdatePassword />
          </div>
        </div>
      </div>
    )
  }
}

export default ChangePassword
