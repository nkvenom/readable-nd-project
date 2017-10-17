import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../redux'

class PostList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAllPosts())
  }

  render() {
    return (
      <div>
        {this.props.data && JSON.stringify(this.props.data, null, 4)}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.posts.data
  }
}
export default connect(mapStateToProps)(PostList)