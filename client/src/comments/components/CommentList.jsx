import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as selectors from '../redux/selectors'
import * as actions from '../redux/actions'
import CommentItem from './CommentItem'

class CommentList extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  componentDidMount() {
    console.log(this.props.fetchCommentsByPostId)
    this.props.fetchCommentsByPostId(this.props.postId)
  }

  downVote = (postId, id) => {
    this.props.vote(postId, id, -1)
  }

  upVote = (postId, id) => {
    this.props.vote(postId, id, 1)
  }

  render() {
    const { list } = this.props
    return (
      <div>
        {list &&
          list.map(c => (
            <CommentItem
              comment={c}
              upVote={this.upVote}
              downVote={this.downVote}
              delete={this.props.deleteComment}
              key={c.id}
            />
          ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: selectors.getCommentListByPostId(state, ownProps.postId)
})
const mapDispatchToProps = {
  deleteComment: actions.deleteComment,
  vote: actions.vote,
  fetchCommentsByPostId: actions.fetchCommentsByPostId
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
