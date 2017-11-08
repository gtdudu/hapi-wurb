import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import _ from 'lodash';

import { logOut } from "../../actions/auth/logOut";
import Link from '../../components/link/Link.js';
import Button from "../button/Button"

class Menu extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.props.logOut()
  }

  render() {
    return (
        <ul className="menu">
          {
            this.props.isAdmin &&
            (
              <li>
                <Link to="/dashboard">dashboard</Link>
              </li>
            )
          }
          {
            this.props.loggedIn &&
            (
              <li>
                <Link to="/profile">account</Link>
              </li>
            )
          }
          <li>
            <Link to="/canard">canard</Link>
          </li>
          <li>
            <Link to="/project">project</Link>
          </li>
          <li>
            <Link to="/contact">contact</Link>
          </li>
          {
            this.props.loggedIn ?
            (
              <li onClick={this.handleClick}>
                <Button>logout</Button>
              </li>
            ) :
            (
              <li>
                <Link to="/login">login</Link>
              </li>
            )
          }
          <li>
            <Link to="/cart">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                (1)
            </Link>
          </li>
        </ul>
    )
  }
}

Menu.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    isAdmin: (_.indexOf(state.account.base, 'admin') !== -1),
    loggedIn: state.auth._store.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut())
    }
  }
}

const AugmentedMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu)

export default AugmentedMenu
