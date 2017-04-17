import React from 'react';
import PropTypes from 'prop-types';

const Sandbox = () => {
  return (
    <div className="outer_face">
      <div className="marker oneseven"></div>
      <div className="marker twoeight"></div>
      <div className="marker fourten"></div>
      <div className="marker fiveeleven"></div>
      <div className="inner_face">
        <div className="hand hour"></div>
        <div className="hand minute"></div>
        <div className="hand second"></div>

      </div>

    </div>
  );
};


Sandbox.propTypes = {
  children : PropTypes.object
};

export default Sandbox;
