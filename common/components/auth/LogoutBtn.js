import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux";
import { logOut } from "../../actions/auth/logOut";

class LogoutBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noStyle: props.noStyle || false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.logOut()
  }

  render() {
    const formStyle = this.state.noStyle ? 'unstyle-form' : ''
    const btnStyle = this.state.noStyle ? 'unstyle-btn' : 'btn'
    return (
      <form className={formStyle} onSubmit={this.handleSubmit} >
        <button type="submit" className={btnStyle}>
          <div>SignOut</div>
        </button>
      </form>
    )
  }
}

LogoutBtn.propTypes = {
  logOut: PropTypes.func.isRequired,
  noStyle: PropTypes.bool
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut())
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state.logOut
  }
}

const LogoutBtnForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutBtn)

export default LogoutBtnForm
