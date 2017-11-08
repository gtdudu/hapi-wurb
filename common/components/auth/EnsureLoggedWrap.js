import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux"

class EnsureLogged extends Component {

  componentWillMount() {
    if (this.props.auth.loggedIn === false) {
      this.context.router.push('/login');
    }
  }

  componentDidUpdate() {
    if (this.props.auth.loggedIn === false) {
      this.context.router.push('/login');
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

EnsureLogged.propTypes = {
  auth: PropTypes.object.isRequired,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

EnsureLogged.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth._store
  }
}

const EnsureLoggedWrap = connect(
  mapStateToProps
)(EnsureLogged)

export default EnsureLoggedWrap
