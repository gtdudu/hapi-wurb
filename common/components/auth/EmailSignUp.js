import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux";
import { emailSignUpFormUpdate, emailSignUpSubmit } from "../../actions/auth/emailSignUp";
import Input from "../input/Input.js"
import Button from "../../components/button/Button"
import Link from "../../components/link/Link"

class EmailSignUp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
    const query = this.context.router.location.query.redirect || '/project'
    if (this.props.auth.loggedIn === true) {
      this.context.router.push(query);
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.signup()
  }

  handleChange(key, value) {
    this.props.update(key, value)
  }
  render() {
    const formData = this.props.state.formData
    return (
      <div className="twoColumns">
        <div className="left registerBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>S'inscrire</h1>
            <form onSubmit={this.handleSubmit} >
              <div className="login-errors">
                {this.props.state.errors.map((item, i) => {
                  return (
                    <p key={i}>{item}</p>
                  )
                })}
              </div>

              <div className="half-field">
                <div>
                  <Input type="text" id="firstName" label="Prénom" handleChange={this.handleChange} value={formData.firstName || ""} />
                </div>
                <div>
                  <Input type="text" id="lastName" label="Nom" handleChange={this.handleChange} value={formData.lastName || ""} />
                </div>
              </div>
              <Input type="text" id="email" label="Email" handleChange={this.handleChange} value={formData.email || ""} />
              <Input type="password" id="password" label="Mot de passe" handleChange={this.handleChange} value={formData.password || ""} />
              <Input type="password" id="confirmPassword" label="Confirmer le mot de passe" handleChange={this.handleChange} value={formData.confirmPassword || ""} />
              <Button
                type="submit"
                loading={this.props.state.loading}
                label="S'inscrire" placeholder="loading" />
            </form>
            <p>Vous avez déjà un compte ? <Link to="login">Se connecter !</Link></p>
          </div>
        </div>
      </div>

    )
  }
}

EmailSignUp.propTypes = {
  state: PropTypes.shape({
    errors: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired
  }).isRequired,
  auth: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
}

EmailSignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    update: (id, value) => {
      dispatch(emailSignUpFormUpdate(id, value))
    },
    signup: () => {
      dispatch(emailSignUpSubmit())
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state.auth.emailSignUp,
    auth: state.auth._store
  }
}


const EmailSignUpForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignUp)

export default EmailSignUpForm
