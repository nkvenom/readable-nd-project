import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import { formatDate } from '../../utils/formatDate'
import style from './CommentItem.css'

export default class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  state = {
    mode: 'detail'
  }

  deleteComment = () => {
    const { parentId, id } = this.props.comment

    this.props.delete(parentId, id)
  }

  upVote = () => {
    const { parentId, id } = this.props.comment

    this.props.upVote(parentId, id)
  }

  downVote = () => {
    const { parentId, id } = this.props.comment

    this.props.downVote(parentId, id)
  }

  toggleEditMode = () => {
    this.setState(({ mode }) => {
      return {
        mode: mode === 'edit' ? 'detail' : 'edit'
      }
    })
  }

  renderVotingGroup = () => {
    const { comment: { voteScore } } = this.props
    return (
      <Fragment>
        {voteScore}
        <div className="btn-group">
          <button
            className="btn btn-sm btn-light"
            title="Vote up"
            onClick={this.upVote}
          >
            <i className="fa fa-arrow-up" aria-hidden="true" />
          </button>

          <button
            className="btn btn-sm btn-light"
            title="Vote down"
            onClick={this.downVote}
          >
            <i className="fa fa-arrow-down" aria-hidden="true" />
          </button>
        </div>
      </Fragment>
    )
  }

  renderDetail() {
    const { comment: { body, author, timestamp } = {} } = this.props
    return (
      <div className={style.commentBox}>
        <div className={style.votingButtons}>{this.renderVotingGroup()}</div>
        <div className={style.commentBlock}>
          <p>{body}</p>
          <span className={style.authoring}>
            by {author} on {formatDate(timestamp)}
          </span>
        </div>
        <div className={style.toolbar}>
          <button
            className="btn btn-sm"
            onClick={this.toggleEditMode}
            title="edit"
          >
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
          <button
            className="btn btn-sm"
            onClick={this.deleteComment}
            title="Delete"
          >
            <i className="fa fa-trash" aria-hidden="true" />
          </button>
        </div>
      </div>
    )
  }

  onEditFinished = newComment => {
    this.toggleEditMode()
    const { comment: oldComment } = this.props
    const payload = { ...oldComment, ...newComment }
    this.props.onEditFinished(payload)
  }

  render() {
    const { comment } = this.props
    if (this.state.mode === 'detail') {
      return this.renderDetail()
    }

    if (this.state.mode === 'edit') {
      return (
        <CommentForm
          comment={comment}
          onCancel={this.toggleEditMode}
          onEditFinished={this.onEditFinished}
        />
      )
    }

    return null
  }
}
