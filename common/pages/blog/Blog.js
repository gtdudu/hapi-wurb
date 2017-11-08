import React, { Component } from 'react';

import { default as Morrison } from '../../components/Morrison';
import Header from '../../components/button/Button.js';

class Blog extends Component {
  render() {
    return (
      <Morrison>
        <Header></Header>
      </Morrison>
    )
  }
}


Blog.propTypes = {

};

export default Blog;
