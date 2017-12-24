import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts, getPostList } from '../redux'
import PostItem from './PostItem'
import * as actions from '../redux/actions'


class PostList extends Component {
  componentDidMount() {
    this.props.fetchAllPosts()
  }

  downVote = (id) => {
    this.props.vote(id, -1)
  };

  upVote = (id) => {
    this.props.vote(id, 1)
  };

  render() {
    const { list } = this.props
    return (
      <div>
        {list.map((li) => (
          <PostItem {...li} key={li.id} upVote={this.upVote} downVote={this.downVote}/>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list: getPostList(state),
  }
}
const mapDispatchToProps = {
  vote: actions.vote,
  fetchAllPosts,
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
