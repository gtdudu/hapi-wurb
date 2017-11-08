import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Loader from "../loader/Loader"

class Button extends Component {
  render() {
    const label = this.props.loading ? <Loader placeholder={this.props.placeholder} /> : this.props.label
    const className = `${this.props.className} btn`;
    return (
      <button type={this.props.type || 'button'} className={className}>
        {label}
      </button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.string,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
}

export default Button
