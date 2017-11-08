import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux";
import {
  askPasswordResetFormUpdate,
  askPasswordResetSubmit
} from "../../actions/auth/askPasswordReset";
import Input from "../input/Input"
import Button from "../../components/button/Button"
import Link from "../../components/link/Link"

class AskPasswordReset extends Component {
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

  render() {
    const formData = this.props.state.formData
    return (
      <div className="twoColumns">
        <div className="left recoverBg"></div>
        <div className="right">
          <div className="right-content">
            <h1>Vous avez oublié votre mot de passe ?</h1>
            <div>
              {
                this.props.state.done ?
                  <p>un mail vous a été envoyé</p> :
                null
              }
              <form onSubmit={this.handleSubmit} >
                <div className="login-errors">
                </div>
                <Input type="text" id="email" label="Email" handleChange={this.handleChange} value={formData.email || ""} />
                <Button
                  type="submit"
                  label="M'envoyer les instructions pour récupérer mon mot de passe"
                  loading={this.props.state.loading} />
              </form>
            </div>
            <p>Ça me revient. <Link to="login">Se connecter !</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

AskPasswordReset.propTypes = {
  state: PropTypes.shape({
    errors: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    done: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired
  }).isRequired,
  update: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    update: (id, value) => {
      dispatch(askPasswordResetFormUpdate(id, value))
    },
    submit: () => {
      dispatch(askPasswordResetSubmit())
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state.auth.askPasswordReset
  }
}


const AskPasswordResetForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AskPasswordReset)

export default AskPasswordResetForm
