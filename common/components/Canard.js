import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Link from './link/Link';
// import Menu from './menu/Menu'

class Canard extends Component {

  render() {
    return (
  	  <div className="canard">
        <ul className="items">
            <li className="item">
                <input type="checkbox" id="trigger-0" className="menu-trigger"/>
                <label htmlFor="trigger-0" className="header">Item A Header</label>
                <div className="content">
                    <p>really</p>
                    <p>really</p>
                    <p>really</p>
                    <p>really</p>
                    <p>really</p>
                </div>
            </li>
        </ul>
       </div>
    )
  }
}

Canard.propTypes = {
  app: PropTypes.object,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}


Canard.defaultProps = {
 children: null
}

const mapStateToProps = state => {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(Canard);
