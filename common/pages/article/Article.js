import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Article extends Component {

  render() {
    return (
      <div>
        <div className="col-12 mb-4">
            <img className="img-fluid project-img" src="/public/unsplash.jpg" alt="nop" />
        </div>
        <div className="col-12 pt-lg-3 mb-4 px-4 portfolio-content">
          Article
        </div>
      </div>
    )
  }
}

Article.propTypes = {
  categories: PropTypes.array,
}

export default Article;
