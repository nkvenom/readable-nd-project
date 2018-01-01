import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PostForm extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    onEditFinished: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
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
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input id="category" type="text" defaultValue={post.category} />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" defaultValue={post.title} />
          </div>

          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea id="body" cols="30" rows="10" defaultValue={post.body} />
          </div>

          <div className="form-group">
            <label htmlFor="author">author</label>
            <input id="author" type="text" defaultValue={post.author} />
          </div>

          <div>
            <button type="submit">Ok</button>
            <button onClick={this.props.onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

export default PostForm
