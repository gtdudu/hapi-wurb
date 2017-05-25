import React from 'react';
import PropTypes from 'prop-types';

const Sandbox = () => {
  return (
    <div>
      <a name="test1">test1</a>
    </div>
  );
};


Sandbox.propTypes = {
  children : PropTypes.object
};

export default Sandbox;
