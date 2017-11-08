import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux";
import {
  emailSignInFormUpdate,
  emailSignIn
} from "../../actions/auth/emailSignIn";
import Input from "../input/Input"
import Button from "../../components/button/Button"
import Link from "../../components/link/Link"

class EmailSignIn extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.signin()
  }

  handleChange(key, value) {
    this.props.update(key, value)
  }

  componentDidUpdate() {
    const query = this.context.router.location.query.redirect || '/profile'
    if (this.props.auth.loggedIn === true) {
      this.context.router.push(query);
    }
  }

  render() {
    const formData = this.props.state.formData
    return (
      <div className="twoColumns">
        <div className="left loginBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit} >
              <div className="login-errors">
                {this.props.state.errors.map((item, i) => {
                  return (
                    <p key={i}>{item}</p>
                  )
                })}
              </div>
              <Input type="text" id="email" label="Email" handleChange={this.handleChange} value={formData.email || ""} />
              <Input type="password" id="password" label="Mot de passe" handleChange={this.handleChange} value={formData.password || ""} />
              <Button
                type="submit"
                loading={this.props.state.loading}
                label="Se logger" placeholder="loading" />
            </form>
            <p><Link to="recover-password">Mot de passe oublié ?</Link></p>
            <p>Pas encore de compte ? <Link to="register">S'inscrire !</Link></p>
          </div>
        </div>
      </div>

    )
  }
}

EmailSignIn.propTypes = {
  state: PropTypes.shape({
    errors: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired
  }).isRequired,
  auth: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired
}

EmailSignIn.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    update: (id, value) => {
      dispatch(emailSignInFormUpdate(id, value))
    },
    signin: () => {
      dispatch(emailSignIn())
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state.auth.emailSignIn,
    auth: state.auth._store
  }
}

const EmailSignInForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignIn)

export default EmailSignInForm
