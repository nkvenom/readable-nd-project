import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommmentForm extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
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
    const { comment } = this.props
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              cols="20"
              rows="5"
              defaultValue={comment.body}
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">author</label>
            <input id="author" type="text" defaultValue={comment.author} />
          </div>

          <div>
            <button type="submit">Ok</button>
            <button onClick={this.onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CommmentForm
