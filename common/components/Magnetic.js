import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Link from './link/Link';
import Menu from './menu/Menu'

class Magnetic extends Component {

  render() {
    return (
  	  <div className="wrap">
        <header className="header">
          <input
            className="hidden-checkbox"
            type="checkbox"
            name="checkbox"
            id="checkbox_id"
            value="value" />

          <div className="logo">
            <Link to="/">WAID</Link>
          </div>

          <label
            className="menu-trigger"
            htmlFor="checkbox_id">
            <div className="menu-btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
          </label>

          <Menu />
        </header>

        <div className="content">
            {this.props.children}
        </div>

       </div>
    )
  }
}

Magnetic.propTypes = {
  app: PropTypes.object,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}


Magnetic.defaultProps = {
 children: null
}

const mapStateToProps = state => {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(Magnetic);
