import React, { Component, PropTypes } from 'react'

class Input extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    // send back key and value
    this.props.handleChange(this.props.id, e.target.value)
  }

  render() {
    return (
      <div className="input-field">

        <input
          type={this.props.type}
          name={this.props.id}
          id={this.props.id}
          placeholder={this.props.placeholder || this.props.label}
          onChange={this.handleChange}
          value={this.props.value}
        />

        <label
          htmlFor={this.props.id}>
          {this.props.label} :
        </label>

      </div>
    )
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string
}

export default Input
