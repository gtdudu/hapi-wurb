import React, { Component } from 'react';

import { default as Magnetic } from '../../components/Magnetic';
import Header from '../../components/button/Button.js';

class Home extends Component {
  render() {
    return (
      <Magnetic>
        <Header></Header>
      </Magnetic>
    )
  }
}


Home.propTypes = {

};

export default Home;
