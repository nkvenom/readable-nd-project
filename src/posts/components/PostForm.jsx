import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'

import style from './PostForm.css'
import { getCategories } from '../../categories/redux/selectors'

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
    const { post, categories } = this.props
    return (
      <div className={cn('card', style.postForm)}>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select className="form-control" id="category" type="text" defaultValue={post.category}>
                {categories && categories.map(c => (
                  <option key={c.path} value={c.path}>{c.name}</option>
                ))}
              </select>
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

const mapStateToProps = (state) => ({
  categories: getCategories(state)
})

export default connect(mapStateToProps, null)(PostForm)
