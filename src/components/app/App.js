import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};


App.propTypes = {
  children : PropTypes.object
};

export default App;
