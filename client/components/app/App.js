import React, { PropTypes } from 'react';

const App = ({ children }) => {
  return (
    <div className="root">
      {children}
    </div>
  );
};


App.propTypes = {
  children : PropTypes.object
};

export default App;
