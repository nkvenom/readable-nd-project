import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
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

  render() {
    const { body, author, voteScore } = this.props.comment
    return (
      <div>
        <hr/>
        {body} <br/>
        {author}
        {voteScore}
        <button onClick={this.upVote}>Up</button>
        <button onClick={this.downVote}>Down</button>
        <button onClick={this.deleteComment}>Delete</button>
      </div>
    )
  }
}
