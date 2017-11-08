import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logOut } from "../../actions/auth/logOut";
import {
  getAccount,
  getAccounts,
  deleteAccount
} from "../../actions/account/account";
import Button from "../button/Button"


class Account extends Component {
  constructor(props) {
    super(props)
    this.handleSubmitLogOut = this.handleSubmitLogOut.bind(this)
    this.handleSubmitDeleteAccount = this.handleSubmitDeleteAccount.bind(this)
  }

  static fetchData({ dispatch }) {
    return [dispatch(getAccount()), dispatch(getAccounts())]
  }

  componentDidMount() {
    const { dispatch } = this.props;
    Account.fetchData({ dispatch });
  }

  handleSubmitLogOut(e) {
    e.preventDefault()
    this.props.logOut()
  }

  handleSubmitDeleteAccount(e) {
    e.preventDefault()
    this.props.deleteAccount()
  }

  render() {
    const user = this.props.state
    return (
      <div>
        <p> email : {user.email} </p>
        <p> firstName : {user.firstName} </p>
        <p> lastName : {user.lastName} </p>
        <p> scope : {user.scope} </p>
        <p> whireId : {user.whireId} </p>
        <form onSubmit={this.handleSubmitLogOut} >
          <Button type="submit" label="Se déconnecter" loading={false} />
        </form>
        <form onSubmit={this.handleSubmitDeleteAccount} >
          <Button type="submit" label="Supprimer Votre Compte (irréversible)" loading={this.props.state.loading} />
        </form>
      </div>
    )
  }
}

Account.propTypes = {
  dispatch: PropTypes.func,
  logOut: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

Account.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    logOut() {
      dispatch(logOut())
    },
    deleteAccount() {
      dispatch(deleteAccount())
    },
    dispatch
  }
}

const mapStateToProps = state => {
  return {
    state: state.account,
    auth: state.auth._store
  }
}

const AccountForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

export default AccountForm
