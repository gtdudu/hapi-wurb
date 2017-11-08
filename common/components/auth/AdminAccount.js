import React, {Component, PropTypes} from 'react'
import {connect} from "react-redux";
import {logOut} from "../../actions/auth/logOut";
import {
  getAccount,
  deleteAccount
} from "../../actions/account/account";
import Button from "../../components/button/Button"

class AdminAccount extends Component {
  constructor(props) {
    super(props)
    this.handleSubmitLogOut = this.handleSubmitLogOut.bind(this)
    this.handleSubmitDeleteAccount = this.handleSubmitDeleteAccount.bind(this)
  }

  static fetchData({ dispatch }) {
    return dispatch(getAccount())
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (!this.props.state.email || this.props.state.email === "") {
      AdminAccount.fetchData({ dispatch });
    }
  }

  handleSubmitLogOut(e) {
    e.preventDefault()
    this.props.logOut()
  }

  handleSubmitDeleteAccount(e) {
    e.preventDefault()
    this.props.deleteAccount()
  }

  render(){
    const admin = this.props.state
    return (
      <div>
        <p> email : {admin.email} </p>
        <p> firstName : {admin.firstName} </p>
        <p> lastName : {admin.lastName} </p>
        <p> scope : {admin.scope} </p>
        <p> whireId : {admin.whireId} </p>
        <form onSubmit={this.handleSubmitLogOut} >
          <Button label="Se déconnecter" loading={false} />
        </form>
        <form onSubmit={this.handleSubmitDeleteAccount} >
          <Button label="Supprimer Votre Compte (irréversible)" loading={this.props.state.loading} />
        </form>
      </div>
    )
  }
}

AdminAccount.propTypes = {
  dispatch : PropTypes.func,
  logOut : PropTypes.func.isRequired,
  deleteAccount : PropTypes.func.isRequired,
  state : PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired
}

AdminAccount.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut : () => {
      dispatch(logOut())
    },
    deleteAccount : () => {
      dispatch(deleteAccount())
    },
    dispatch
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.adminAccount,
    auth : state.auth.authorization
  }
}

const AdminAccountForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminAccount)

export default AdminAccountForm
