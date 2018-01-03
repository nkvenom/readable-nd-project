import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import PostForm from './PostForm'

import style from './PostItem.css'

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
      voteScore: PropTypes.number
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

  onEditFinished = newPost => {
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
      <div className={style.postItem}>
        <div className="btn-group-vertical">
          <button
            className="btn btn-sm btn-outline-dark"
            title="Vote up"
            onClick={this.upVote}
          >
            <i className="fa fa-arrow-up" aria-hidden="true" />
          </button>
          <div className="btn btn-sm disabled btn-outline-dark">
            {voteScore}
          </div>
          <button
            className="btn btn-sm btn-outline-dark"
            title="Vote down"
            onClick={this.downVote}
          >
            <i className="fa fa-arrow-down" aria-hidden="true" />
          </button>
        </div>
        <div className={style.postBlock}>
          <Link to={`/${category}/${id}`}>
            {title}
          </Link>
          <div><span className="text-muted">Submitted on {strDate} by {author}</span></div>
          <p>{commentCount} comments</p>
        </div>
        <div className={style.postToolbar}>
          <button className="btn btn-sm" onClick={this.toggleEditMode} title="edit"><i className="fa fa-pencil" aria-hidden="true" /></button>
          <button className="btn btn-sm" onClick={this.delete} title="Delete"><i className="fa fa-trash" aria-hidden="true" /></button>
        </div>
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
