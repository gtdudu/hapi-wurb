import React, { PropTypes } from 'react'

const Loader = ({placeholder = ""}) => (
  <div className="loader">
    {
      placeholder === "" ?
      <span/> :
      <span className="placeholder">{placeholder}</span>
    }
  	<span className="loading">
      <span className="outerCircle" />
  	</span>
  </div>
)

Loader.propTypes = {
  placeholder: PropTypes.string
}

export default Loader
