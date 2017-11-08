import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux"
import { validateAccountRequest } from "../../actions/auth/validateAccount"
import Link from "../../components/link/Link"

class ValidateAccount extends Component {
  componentDidMount() {
    if (!this.props.route.query.token) { // eslint-disable-line
      console.log('No token in route, redirect.');
      // this.context.router.push('/');
    } else {
      this.props.verifToken(this.props.route.query.token)
    }
  }

  componentDidUpdate() {
    if (this.props.state.done) this.context.router.push('/profile');
  }

  render() {
    const errs = this.props.state.errors.map(err => {
      return err
    })
    return (
        <div className="2-columns">
          <div className="left"></div>
          <div className="right">
            <div className="right-content">
              <h1>Validation de votre compte :)</h1>
              <div>
                Votre compte est en cours de validation..
                <p>
                  {
                    this.props.state.errors ?
                     <span>'Something went wrong ... :' {errs} </span> :
                     ''
                  }
                </p>
                <span>
                  {
                    this.props.state.done ?
                      <p> Votre compte est validé!</p> :
                      <p> Votre compte n'est pas valide..</p>
                  }
                </span>
              </div>
              <p><Link to="login">Se connecter</Link></p>
              <p><Link to="recover">Mot de passe oublié ?</Link></p>
              <p>Pas encore de compte ? <Link to="register">S'inscrire !</Link></p>
            </div>
          </div>
        </div>
    )
  }
}

ValidateAccount.propTypes = {
  state: PropTypes.shape({
    errors: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  verifToken: PropTypes.func.isRequired,
  route: PropTypes.object
}

ValidateAccount.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    verifToken: token => {
      dispatch(validateAccountRequest(token))
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state.auth.validateAccount,
    route: state.routing.locationBeforeTransitions
  }
}


const ValidateAccountComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidateAccount)

export default ValidateAccountComp
