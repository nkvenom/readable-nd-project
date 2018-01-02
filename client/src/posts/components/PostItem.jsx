import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import PostForm from './PostForm'

export default class PostItem extends Component {
  state = {
    editMode: false
  }

  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string,
      timestamp: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
      author: PropTypes.string,
      category: PropTypes.string,
      voteScore: PropTypes.number,
    }),
    delete: PropTypes.func.isRequired
  }

  upVote = () => {
    const { post: { id } } = this.props
    this.props.upVote(id)
  }

  downVote = () => {
    const { post: { id } } = this.props
    this.props.downVote(id)
  }

  delete = () => {
    const { post: { id } } = this.props
    this.props.delete(id)
  }

  toggleEditMode = () => {
    this.setState(({ editMode }) => {
      return {
        editMode: !editMode
      }
    })
  }

  onEditFinished = (newPost) => {
    const { post: oldPost } = this.props
    const payload = { ...oldPost, ...newPost }
    payload.timestamp = oldPost.timestamp
    this.props.onEditFinished(payload)
    this.toggleEditMode()
  }

  renderItem = () => {
    const { post } = this.props
    const {
      title,
      author,
      voteScore,
      commentCount,
      timestamp,
      category,
      id
    } = post
    const strDate = new Date(timestamp).toLocaleDateString()
    return (
      <div>
        <Link to={`/${category}/${id}`}>
          {title} | {strDate} | {author}
        </Link>
        | comments: ({commentCount}) |
        {voteScore}
        <button onClick={this.upVote}>Up</button>
        <button onClick={this.downVote}>Down</button>
        <button onClick={this.toggleEditMode}>edit</button>
        <button onClick={this.delete}>Delete</button>
      </div>
    )
  }

  render() {
    const { post } = this.props
    const { editMode } = this.state

    return editMode ? (
      <PostForm
        post={post}
        onCancel={this.toggleEditMode}
        onEditFinished={this.onEditFinished}
      />
    ) : (
      this.renderItem()
    )
  }
}
