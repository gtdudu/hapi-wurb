import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class customLink extends Component {

 render() {
    return (
      <Link
        to={this.props.to}
        activeClassName="active"
        className="link"
      >
        {this.props.children}
      </Link>
    );
  }
}

customLink.propTypes = {
  to: PropTypes.string,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),

}


export default customLink;
