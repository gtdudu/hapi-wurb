import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchShowsNeeded } from '../../actions/show.js';

export class Index extends Component {

  static fetchData({ dispatch }) {
    return dispatch(fetchShowsNeeded())
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.shows.length === 0) {
      Index.fetchData({ dispatch });
    }
  }

  render() {
    return (
      <div className="root">
        <div className="logo">
          <img src="/public/Logo.svg" />
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  dispatch : PropTypes.func,
  shows : PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    shows : state.app.shows
  };
}

export default connect(mapStateToProps)(Index);
