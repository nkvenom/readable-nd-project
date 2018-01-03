import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import style from './PostForm.css'

class PostForm extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    onEditFinished: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  onSubmit = e => {
    e.preventDefault()
    const inputs = Array.from(e.target.querySelectorAll('.form-group [id]'))
    const updatedValues = inputs.reduce((c, i) => {
      c[i.id] = i.value
      return c
    }, {})

    updatedValues.timestamp = new Date(updatedValues.timestamp).getTime()
    this.props.onEditFinished(updatedValues)
  }

  render() {
    const { post } = this.props
    return (
      <div className={cn('card', style.postForm)}>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input className="form-control" id="category" type="text" defaultValue={post.category} />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input className="form-control" id="title" type="text" defaultValue={post.title} />
            </div>

            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
              className="form-control"
                id="body"
                cols="30"
                rows="10"
                defaultValue={post.body}
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">author</label>
              <input className="form-control" id="author" type="text" defaultValue={post.author} />
            </div>

            <div>
              <button className="btn btn-primary" type="submit">Ok</button>
              <button className="btn btn-secondary" onClick={this.props.onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default PostForm
