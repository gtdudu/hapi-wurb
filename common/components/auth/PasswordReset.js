import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux";
import {
  passwordResetFormUpdate,
  passwordResetSubmit,
  passwordResetTokenUpdate
} from "../../actions/auth/passwordReset";
import Input from "../input/Input.js"
import Button from "../../components/button/Button"

class PasswordReset extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    this.props.submit()
    e.preventDefault()
  }

  handleChange(key, value) {
    this.props.update(key, value)
  }

  componentDidMount() {
    if (!this.props.route.query.token) { //eslint-disable-line
      console.log('No token in route, redirect.');
      this.context.router.push('/');
    } else {
      this.props.updateToken(this.props.route.query.token)
    }
  }

  componentDidUpdate() {
    if (this.props.state.done) {
      console.log('done, redirect in 3 sec');
      setTimeout(() => {
        this.context.router.push('/profile')
      }, 3000)
    }
  }

  render() {
    const formData = this.props.state.formData
    const errors = this.props.state.errors.map(error => {
      return (<p>{error}</p>)
    })
    return (
      <div className="twoColumns">
        <div className="left resetBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>Choisir un nouveau mot de passe</h1>
            <form onSubmit={this.handleSubmit} >
              <div className="login-errors">
                {errors}
              </div>
              <div className="login-success">
                {
                  this.props.state.done ?
                    <p>Votre mot de passe à été mis à jour!</p> :
                    null
                }
              </div>
              <Input type="password" id="newPassword" label="newPassword" handleChange={this.handleChange} value={formData.newPassword || ""} />
              <Input type="password" id="newPasswordVerif" label="newPasswordVerif" handleChange={this.handleChange} value={formData.newPasswordVerif || ""} />
              <Button
                type="submit"
      					label="Créer un nouveau Mot de passe"
      					loading={this.props.state.loading} />
            </form>
          </div>
        </div>
      </div>

    )
  }
}

PasswordReset.propTypes = {
  state: PropTypes.shape({
    errors: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    done: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired
  }).isRequired,
  update: PropTypes.func.isRequired,
  updateToken: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  route: PropTypes.object
}

PasswordReset.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    update: (id, value) => {
      dispatch(passwordResetFormUpdate(id, value))
    },
    updateToken: token => {
      dispatch(passwordResetTokenUpdate(token))
    },
    submit: () => {
      dispatch(passwordResetSubmit())
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state.auth.passwordReset,
    route: state.routing.locationBeforeTransitions
  }
}


const PasswordResetForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordReset)

export default PasswordResetForm
