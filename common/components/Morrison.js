import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from './button/Button';
import Menu from './menu/Menu'

class Morrison extends Component {

  constructor(props) {
    super(props);

		this.state = {
			isStickyOn: false,
		}

    this.addSticky = this.addSticky.bind(this, this.getOffset);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.addSticky);
  }

  addSticky() {
		if (!this.state.treshold) {
    	const element = document.getElementsByClassName("menu")[0];
	    const offset = this.getOffset(element);
			const style = element.currentStyle || window.getComputedStyle(element)
	    const margin = parseFloat(style.marginTop) + parseFloat(style.marginTop);
	    const treshold = offset.y - (element.offsetHeight - margin);
			this.setState({treshold});
			return;
		}

		if (!this.state.isStickyOn && pageYOffset > this.state.treshold) {
			document.getElementById('sticky').className = "wrap2 sticky";
			this.setState({ isStickyOn: true });
			return;
		}

		if (this.state.isStickyOn && pageYOffset > this.state.treshold) {
			return;
		}

		document.getElementById('sticky').className = "wrap2";
		this.setState({ isStickyOn: false });
  }

  componentDidMount() {
    if (!window || !document.getElementById('sticky')) {
      return;
    }

    window.addEventListener("scroll", this.addSticky);
  }

  getOffset(element) {
    const body = document.body;
    const win = document.defaultView;
    const docElem = document.documentElement;
    let box = document.createElement('div');
    box.style.paddingLeft = box.style.width = "1px";
    body.appendChild(box);
    const isBoxModel = box.offsetWidth == 2;
    body.removeChild(box);
    box = element.getBoundingClientRect();
    const clientTop = docElem.clientTop || body.clientTop || 0;
    const clientLeft = docElem.clientLeft || body.clientLeft || 0;
    const scrollTop = (win.pageYOffset || isBoxModel) && (docElem.scrollTop || body.scrollTop);
    const scrollLeft = (win.pageXOffset || isBoxModel) && (docElem.scrollLeft || body.scrollLeft);
    return {
      y: box.top + scrollTop - clientTop,
      x: box.left + scrollLeft - clientLeft
    };
  }

  render() {
    return (
  	  <div id="sticky" className="wrap2">
        <input
          className="hidden-checkbox"
          type="checkbox"
          name="checkbox"
          id="checkbox_id"
          value="value" />

        <div className="info">
          <div className="un">
          </div>
          <div className="deux">
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>

          </div>
          <div className="trois">
            <p>EN | FR</p>
          </div>
        </div>

        <div className="logo">
          <h1>WAID</h1>
        </div>

        <label
          className="menu-trigger"
          htmlFor="checkbox_id">
          <Button
            className="dark"
            type="button"
            placeholder="test it"
          >
            menu
          </Button>
        </label>

        <Menu />

        <div className="main-content">

            {this.props.children}

        </div>

      </div>
    )
  }
}


Morrison.defaultProps = {
 children: null
}

Morrison.propTypes = {
  app: PropTypes.object,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

const mapStateToProps = state => {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(Morrison);
