import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as selectors from '../redux/selectors'
import * as actions from '../redux/actions'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'

class CommentList extends Component {

  state= {
    showNewForm: false,
  }

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  componentDidMount() {
    this.props.fetchCommentsByPostId(this.props.postId)
  }

  downVote = (postId, id) => {
    this.props.vote(postId, id, -1)
  }

  upVote = (postId, id) => {
    this.props.vote(postId, id, 1)
  }

  onCommentEditFinished = comment => {
    this.props.updateComment(comment)
  }

  toggleNewForm = () => {
    this.setState(({ showNewForm }) => {
      return {
        showNewForm: !showNewForm
      }
    })
  }

  onNewCommentFinished = (comment) => {
    this.props.createComment({
      ...comment,
      parentId: this.props.postId,
    })
    this.toggleNewForm()
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
              onEditFinished={this.onCommentEditFinished}
              key={c.id}
            />
          ))}

        {this.state.showNewForm ? (
          <CommentNewForm
            onEditFinished={this.onNewCommentFinished}
            onCancel={this.toggleNewForm}
          />
        ) : (
          <button className="btn btn-sm btn-primary" onClick={this.toggleNewForm} id="createNew">
            New Comment
          </button>
        )}
      </div>
    )
  }
}


const CommentNewForm = connect(
  (state, ownProps) => ({
    comment: {
      body: '',
      author: '',
      parentId: ownProps.postId,
    }
  }),
  null
)(CommentForm)

const mapStateToProps = (state, ownProps) => ({
  list: selectors.getCommentListByPostId(state, ownProps.postId)
})
const mapDispatchToProps = {
  deleteComment: actions.deleteComment,
  vote: actions.vote,
  fetchCommentsByPostId: actions.fetchCommentsByPostId,
  createComment: actions.createComment,
  updateComment: actions.updateComment,
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
