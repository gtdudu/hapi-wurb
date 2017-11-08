import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux";
import {
  getAccounts,
} from "../../actions/account/account";
import Button from "../button/Button"


 class List extends Component {

  static fetchData({ dispatch }) {
    return [dispatch(getAccounts())]
  }

  componentDidMount() {
    const { dispatch } = this.props;
    List.fetchData({ dispatch });
  }

  render() {
    return (
      <div className="inner1">
        <ul>
          {this.props.ids.map((id, i) => {
            return (
              <li key={i}>
                <img src="/public/wall.jpg" />
                <h1>{this.props.data[id].firstName}</h1>
                 <p>
                 {this.props.data[id].email}
                </p>
        				<Button type="button" className="dark">{this.props.data[id].lastName}</Button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

List.propTypes = {
  dispatch: PropTypes.func,
  ids: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    ids: state.account.ids,
    data: state.account.data
  }
}

const AugmentedList = connect(
  mapStateToProps,
)(List)

export default AugmentedList
