import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchShowsNeeded } from '../../actions/show.js';

export class Index extends Component {

  static fetchData({ dispatch }) {
    return dispatch(fetchShowsNeeded())
  }

  constructor(props) {
    super(props);
    this.state = {
      local : "local"
    }
    this.click = this.click.bind(this);

  }

  click() {
      console.log("clikc");
      console.log("yolo");
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
        <div className="logo" onClick={this.click}>
          <i className="fa rippleAnimation fa-bullseye" aria-hidden="true"></i>
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
