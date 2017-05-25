import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { fetchShowsNeeded } from '../../actions/show.js';
import fetchPluginsIfNeeded from '../../actions/loadPlugins.js';

export class Index extends Component {

  static fetchData({ dispatch }) {
    return dispatch(fetchPluginsIfNeeded())
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
    Index.fetchData({ dispatch });
  }

  render() {
    return (
      <div className="root">
        <div className="main-question" onClick={this.click}>
          <h1>What can i do for you today ?</h1>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  dispatch : PropTypes.func,
  plugins : PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    plugins : state.app.plugins,
  };
}

export default connect(mapStateToProps)(Index);
