import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux"
import {
  updatePasswordFormUpdate,
  changePasswordFormUpdate
} from "../../actions/auth/updatePassword"
import Input from "../input/Input"
import Button from "../../components/button/Button"

class UpdatePassword extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updatePassword()
  }

  handleChange(key, value) {
    this.props.update(key, value)
  }

  render() {
    const formData = this.props.state.formData
    return (
      <div className="twoColumns">
        <div className="left changePwdBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>Changer de mot de passe</h1>
            <span>
              <form onSubmit={this.handleSubmit} >
                <div className="change-password-errors">
                </div>
                <Input type="password" id="currentPassword" label="Mot de passe Actuel" handleChange={this.handleChange} value={formData.currentPassword || ""} />
                <Input type="password" id="newPassword" label="Nouveau Mot de passe" handleChange={this.handleChange} value={formData.newPassword || ""} />
                <Input type="password" id="newPasswordVerif" label="Vérification nouveau Mot de passe" handleChange={this.handleChange} value={formData.newPasswordVerif || ""} />
                <Button
                  type="submit"
                  label="Confirmer"
                  loading={this.props.state.loading} />
              </form>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

UpdatePassword.propTypes = {
  state: PropTypes.shape({
    errors: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired
  }).isRequired,
  update: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    update: (id, value) => {
      dispatch(updatePasswordFormUpdate(id, value))
    },
    updatePassword: () => {
      dispatch(changePasswordFormUpdate())
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state.auth.updatePassword
  }
}


const UpdatePasswordForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePassword)

export default UpdatePasswordForm
