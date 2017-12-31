import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'

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
    this.setState(({mode}) => {
      return {
        mode: mode === 'edit' ? 'detail' : 'edit'
      }
    })
  }

  renderDetail() {
    const { body, author, voteScore } = this.props.comment
    return (
      <div>
        <hr />
        {body} <br />
        {author}
        {voteScore}
        <button onClick={this.upVote}>Up</button>
        <button onClick={this.downVote}>Down</button>
        <button onClick={this.toggleEditMode}>Edit</button>
        <button onClick={this.deleteComment}>Delete</button>
      </div>
    )
  }

  onEditFinished = (newComment) => {
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
      return <CommentForm comment={comment} onEditFinished={this.onEditFinished} />
    }

    return null
  }
}
